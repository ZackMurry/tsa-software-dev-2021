package org.tsadrz;

import java.io.*;
import java.net.Socket;

public class FileClient {

    private static final int SERVER_PORT = 7265;
    public static Settings settings;

    private final Socket socket;
    private final UserDetails targetDetails;
    private final String filePath;

    public FileClient(UserDetails targetDetails, String filePath) throws IOException {
        this.socket = new Socket(targetDetails.getIp(), SERVER_PORT);
        this.targetDetails = targetDetails;
        this.filePath = filePath;
    }

    public void start() throws Exception {
        final OutputStream out = this.socket.getOutputStream();
        // Take the SHA-256 hash of the user's "password" for the AES secret key
        final byte[] key = new SecretKeyGenerator().generate(targetDetails.getPassword());
        final FileConverter fileConverter = new FileConverter(filePath, key);
        // Write the name of the file so that it can have the same name for the user receiving it
//        out.write((new File(filePath).getName() + "\n").getBytes(StandardCharsets.UTF_8));

        FileModel model = new FileModel(new File(filePath).getName(), fileConverter.encryptAndRead());
        socket.getOutputStream().write(serialize(model));
        out.flush();
        out.close();
        fileConverter.close();

        /*while (true) {
            // Read a line from the file and encrypt it
            final byte[] line = fileConverter.encryptAndRead();
            if (line == null) {
                break;
            }
            this.socket.getOutputStream().write(line);
            out.flush();
        }
        out.close();
        fileConverter.close();*/
    }

    public static void main(String[] args) throws Exception {
        if (args.length < 2) {
            throw new IllegalArgumentException("You need to pass two arguments to send a file: the target id and the file you'd like to share");
        }
        final String targetId = args[0]; // Id of the target user
        final String filePath = args[1]; // Path of file to send
        final UserDetails targetDetails = IdDecoder.decode(targetId);
        System.out.println("Connecting to " + targetDetails.getIp());
        final FileClient fileClient = new FileClient(targetDetails, filePath);
        fileClient.start();
    }

    private static byte[] serialize(FileModel model) throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ObjectOutputStream objectOutputStream = null;

        try {
            objectOutputStream = new ObjectOutputStream(outputStream);
            objectOutputStream.writeObject(model);
            objectOutputStream.flush();
            return outputStream.toByteArray();
        } finally {
            try {
                outputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private static void loadSettings() {
        File settingsFile = new File(System.getProperty("user.dir") + "\\settings");

        if (!settingsFile.exists()) {
            settings = new Settings();
            return;
        }

        try {
            FileInputStream fis = new FileInputStream(settingsFile);
            BufferedInputStream bis = new BufferedInputStream(fis);
            ObjectInputStream ois = new ObjectInputStream(bis);
            settings = (Settings) ois.readObject();
            ois.close();

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error loading settings: " + e.getMessage(), e);
        }

    }

}
