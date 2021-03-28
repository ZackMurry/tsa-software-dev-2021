package org.tsadrz.server;

import java.io.*;

public class FileModel implements Serializable {
    public String name;
    public byte[] data;

    public FileModel(String name, byte[] data) {
        this.name = name;
        this.data = data;
    }


}