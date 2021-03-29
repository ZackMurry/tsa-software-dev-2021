package org.tsadrz;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

/**
 * This is responsible for decrypting data and writing it to the correct file
 */
public class FileConverter {

    private final FileWriter writer;
    private final byte[] key;

    public FileConverter(String path, byte[] key) throws IOException {
        File file = new File(path);
        if (!file.createNewFile()) {
            // This is usually because the file already exists
            // todo: add like (1), (2), etc. after the file's name so that it can continue
            throw new IOException("Error creating file");
        }
        this.writer = new FileWriter(path);
        this.key = key;
    }

    /**
     * Decrypts the cipherText and writes it to the file
     * @param cipherText Encrypted line of file
     * @throws Exception If something goes wrong (encryption error or error writing to file)
     */
    public void decryptAndWriteLine(String cipherText) throws Exception {
        final byte[] decodedCipher = Base64.getDecoder().decode(cipherText);
        final String plainText = new String(AESDecryptor.decrypt(decodedCipher, key));
        writer.write(plainText + "\n");
    }

    public void close() throws IOException {
        writer.flush();
        writer.close();
    }

}
