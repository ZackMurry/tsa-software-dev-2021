package org.tsadrz;

import java.io.*;

public class Main {

    public static Settings settings;

    public static void main(String[] args) {
        loadSettings();
    }

    private static void loadSettings()
    {
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
