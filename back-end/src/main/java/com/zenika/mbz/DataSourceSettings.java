package com.zenika.mbz;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

/*@Configuration
@ConfigurationProperties(locations = "classpath:application.properties",
                         ignoreUnknownFields = false, prefix = "datasource")*/
public class DataSourceSettings {

    private String host;

    public String getHost() {
        return host;
    }

    public void setHost(String host) {

        this.host = host;
    }

}
