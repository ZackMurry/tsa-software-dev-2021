package org.tsadrz.client;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.security.NoSuchAlgorithmException;

public class FileServer {

    private static final int PORT = 7265;
    private static final String baseDirectory = System.getProperty("user.home") + File.separator + "tsa-drz-files";

    private final ServerSocket serverSocket;
    private final byte[] key;

    public FileServer(String password) throws IOException, NoSuchAlgorithmException {
        this.serverSocket = new ServerSocket(PORT, 1, InetAddress.getLocalHost());
        this.key = new SecretKeyGenerator().generate(password);
    }

    public void listen() throws Exception {
        while (true) {
            String data;
            // Wait for a request to come in. Once one comes in, continue
            final Socket client = this.serverSocket.accept();
            final String clientAddress = client.getInetAddress().getHostAddress();
            System.out.println("New connection from " + clientAddress);
            // InputStream of the socket
            final BufferedReader in = new BufferedReader(new InputStreamReader(client.getInputStream()));
            data = in.readLine();
            if (data == null) {
                continue;
            }
            // The first line transferred is the name of the file
            final FileConverter fileConverter = new FileConverter(baseDirectory + File.separator + data, key);
            while ((data = in.readLine()) != null) {
                fileConverter.decryptAndWriteLine(data);
            }
            fileConverter.close();
            // Now that the request has ended, it is ready to receive a new request
        }
    }

    public InetAddress getSocketAddress() {
        return this.serverSocket.getInetAddress();
    }

    public int getPort() {
        return this.serverSocket.getLocalPort();
    }

    public static void main(String[] args) throws Exception {
        // The only argument for this program is the ID of the user that is receiving files
        if (args.length == 0) {
            throw new IllegalArgumentException("Argument required: id of user");
        }
        final UserDetails userDetails = IdDecoder.decode(args[0]);
        final FileServer fileServer = new FileServer(userDetails.getPassword());
        System.out.println("Listening at " + fileServer.getSocketAddress().getHostAddress() + ":" + fileServer.getPort());
        fileServer.listen();
    }

}
