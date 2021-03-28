package org.tsadrz.client;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.stream.Collectors;
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
    public byte[] encryptAndRead() throws Exception {
        final List<Byte> data = new ArrayList<>();
        String line;
        while ((line = reader.readLine()) != null) {
            byte[] lineData = AESEncryptor.encrypt((line + "\n").getBytes(StandardCharsets.UTF_8), key);
            for (byte b : lineData) {
                data.add(b);
            }
        }
        final byte[] dataArr = new byte[data.size()];
        for (int i = 0; i < data.size(); i++) {
            dataArr[i] = data.get(i);
        }
        return dataArr;
    }

    public void close() throws IOException {
        reader.close();
    }

}
