package org.tsadrz.client;

import java.io.Serializable;

public class FileModel implements Serializable {
    public String name;
    public byte[] data;

    public FileModel(String name, byte[] data) {
        this.name = name;
        this.data = data;
    }

}
