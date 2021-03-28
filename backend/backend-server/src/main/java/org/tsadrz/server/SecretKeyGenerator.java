package org.tsadrz.server;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class SecretKeyGenerator {

    private final MessageDigest messageDigest;

    public SecretKeyGenerator() throws NoSuchAlgorithmException {
        this.messageDigest = MessageDigest.getInstance("SHA-256");
    }

    /**
     * Takes a String and generates the SHA-256 hash of it
     * @param input String to hash
     * @return Hash of String
     */
    public byte[] generate(String input) {
        messageDigest.update(input.getBytes(StandardCharsets.UTF_8));
        final byte[] result = messageDigest.digest();
        messageDigest.reset();
        return result;
    }

}
