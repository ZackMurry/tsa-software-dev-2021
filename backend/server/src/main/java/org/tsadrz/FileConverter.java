package org.tsadrz;

import java.io.*;

/**
 * This is responsible for decrypting data and writing it to the correct file
 */
public class FileConverter {

    private final BufferedOutputStream out;
    private final byte[] key;

    public FileConverter(String path, byte[] key) throws IOException {
        File file = new File(path);
        if (!file.createNewFile()) {
            // This is usually because the file already exists
            // todo: add like (1), (2), etc. after the file's name so that it can continue
            throw new IOException("Error creating file");
        }
        this.out = new BufferedOutputStream(new FileOutputStream(path));
        this.key = key;
    }

    /**
     * Decrypts the cipherText and writes it to the file
     * @param cipherText Encrypted line of file
     * @throws Exception If something goes wrong (encryption error or error writing to file)
     */
    public void decryptAndWrite(byte[] cipherText) throws Exception {
        System.out.println("len: " + cipherText.length);
        System.out.println("first byte: " + cipherText[0] + "; " + cipherText[1]);
        final byte[] plainText = AESDecryptor.decrypt(cipherText, key);
        out.write(plainText);
    }

    public void close() throws IOException {
        out.flush();
        out.close();
    }

}
