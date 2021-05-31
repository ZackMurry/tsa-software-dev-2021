package org.tsadrz;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
import java.util.ArrayList;

/**
 * This reads the file and encrypts it using an <code>AESEncryptor</code>
 */
public class FileConverter {

    private final BufferedInputStream in;
    private final byte[] key;

    public FileConverter(String path, byte[] key) throws FileNotFoundException {
        this.in = new BufferedInputStream(new FileInputStream(path));
        this.key = key;
    }

    /**
     * Read the next line of the file and encrypt it. Then, return it.
     * @return The encrypted next line
     * @throws Exception If something goes wrong (encryption error, file gets deleted, etc.)
     */
    public byte[] readAndEncrypt() throws Exception {
        final byte[] plainText = in.readAllBytes(); // Read file
        return AESEncryptor.encrypt(plainText, key); // Encrypt using AES
    }

    public void close() throws IOException {
        in.close();
    }

}
