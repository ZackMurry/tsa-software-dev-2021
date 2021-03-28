package org.tsadrz.client;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

/**
 * This reads the file and encrypts it using an <code>AESEncryptor</code>
 */
public class FileConverter {

    private final BufferedReader reader;
    private final byte[] key;

    public FileConverter(String path, byte[] key) throws FileNotFoundException {
        this.reader = new BufferedReader(new FileReader(path));
        this.key = key;
    }

    /**
     * Read the next line of the file and encrypt it. Then, return it.
     * @return The encrypted next line
     * @throws Exception If something goes wrong (encryption error, file gets deleted, etc.)
     */
    public String encryptAndReadLine() throws Exception {
        final String plainText = reader.readLine(); // Read next line
        if (plainText == null) {
            return null;
        }
        final byte[] cipherText = AESEncryptor.encrypt(plainText.getBytes(StandardCharsets.UTF_8), key); // Encrypt using AES
        return Base64.getEncoder().encodeToString(cipherText); // Convert to Base64 so that it can be sent in String-form
    }

    public void close() throws IOException {
        reader.close();
    }

}
