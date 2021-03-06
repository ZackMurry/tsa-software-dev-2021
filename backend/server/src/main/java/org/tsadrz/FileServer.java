package org.tsadrz;

import java.io.*;
import java.net.BindException;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

public class FileServer {

    private static final int PORT = 7265;
    private static final String baseDirectory = System.getProperty("user.home") + File.separator + "sft-files";

    private final ServerSocket serverSocket;
    private final byte[] key;

    public FileServer(String password) throws IOException, NoSuchAlgorithmException {
        this.serverSocket = new ServerSocket(PORT);
        this.key = new SecretKeyGenerator().generate(password);
    }

    public void listen() throws Exception {
        while (true) {
            // Wait for a request to come in. Once one comes in, continue
            final Socket client = this.serverSocket.accept();
            final String clientAddress = client.getInetAddress().getHostAddress();
            System.out.println("New connection from " + clientAddress);
            // InputStream of the socket
            final BufferedInputStream in = new BufferedInputStream(client.getInputStream());
            byte[] data = in.readAllBytes();
            int lengthOfName = 0;
            byte newLine = "\n".getBytes(StandardCharsets.UTF_8)[0];
            while (data[lengthOfName] != newLine) {
                lengthOfName++;
            }
            final String fileName = new String(Arrays.copyOfRange(data, 0, lengthOfName + 1), StandardCharsets.UTF_8);
            System.out.println("Received: " + fileName);
            // The first line transferred is the name of the file
            final FileConverter fileConverter = new FileConverter(baseDirectory + File.separator + fileName, key);
            try {
                fileConverter.decryptAndWrite(Arrays.copyOfRange(data, lengthOfName + 1, data.length));
            } finally {
                fileConverter.close();
            }
            // Now that the request has ended, it is ready to receive a new request
        }
    }

    public InetAddress getSocketAddress() {
        return this.serverSocket.getInetAddress();
    }

    public int getPort() {
        return this.serverSocket.getLocalPort();
    }

    public static void main(String[] args) {
        // The only argument for this program is the ID of the user that is receiving files
        if (args.length == 0) {
            throw new IllegalArgumentException("Argument required: id of user");
        }
        final File baseDirFile = new File(baseDirectory);
        if (!baseDirFile.exists()) {
            try {
                if (!baseDirFile.mkdir()) {
                    throw new IOException();
                }
            } catch (IOException e) {
                System.out.println("Error creating file to store received files in. Aborting...");
                return;
            }
        }
        try {
            final UserDetails userDetails = IdDecoder.decode(args[0]);
            final FileServer fileServer = new FileServer(userDetails.getPassword());
            System.out.println("Listening at " + fileServer.getSocketAddress().getHostAddress() + ":" + fileServer.getPort());
            fileServer.listen();
        } catch (BindException e) {
            System.out.println("Another instance of the server is already running. Aborting...");
        } catch (Exception e) {
            System.err.println(e.getMessage());
            System.out.println(String.join("\n", Arrays.stream(e.getStackTrace()).map(StackTraceElement::toString).toArray(String[]::new)));
        }
    }
}
