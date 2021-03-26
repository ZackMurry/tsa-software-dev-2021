import Classes.Contact;
import Classes.Settings;

import java.io.*;
import java.util.List;

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

        } catch (FileNotFoundException e) { //Possible exception from FileInputStream
            e.printStackTrace();
        } catch (IOException e) { //Possible exception from ObjectInputStream
            e.printStackTrace();
        } catch (ClassNotFoundException e) { //Possible class not found exception LOL
            e.printStackTrace();
        }


    }

}
