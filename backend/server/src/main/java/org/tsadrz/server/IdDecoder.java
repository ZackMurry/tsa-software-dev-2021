package org.tsadrz.server;

import java.util.Base64;

public class IdDecoder {

    /**
     * Retrieves the data inside of an id
     * @param id Id to decode
     * @return The details found in the id
     * @throws IllegalArgumentException If the decoded id does not include an @ sign
     */
    public static UserDetails decode(String id) {
        final byte[] decodedBytes = Base64.getDecoder().decode(id);
        final String text = new String(decodedBytes);
        final String[] parts = text.split("@");
        if (parts.length != 2) {
            throw new IllegalArgumentException("An id should contain an @ symbol");
        }
        return new UserDetails(id, parts[1], parts[0]);
    }

}

