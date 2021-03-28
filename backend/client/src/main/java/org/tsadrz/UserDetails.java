package org.tsadrz;

public class UserDetails {

    private String id;
    private String ip;
    private String password;

    public UserDetails(String id, String ip, String password) {
        this.id = id;
        this.ip = ip;
        this.password = password;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
