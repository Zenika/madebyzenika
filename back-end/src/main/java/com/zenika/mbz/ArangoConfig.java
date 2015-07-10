package com.zenika.mbz;

import com.arangodb.ArangoConfigure;
import com.arangodb.ArangoDriver;
import com.arangodb.ArangoHost;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import javax.inject.Named;

@Component
public class ArangoConfig {

    public ArangoDriver driver;

    public ArangoConfig(){
        // Initialize configure
        ArangoConfigure configure = new ArangoConfigure();
        configure.setArangoHost(new ArangoHost("127.0.0.1", 8529));
        configure.init();

        // Create Driver (this instance is thread-safe)
        ArangoDriver arangoDriver = new ArangoDriver(configure);
        arangoDriver.setDefaultDatabase("madebyzenika");
        this.driver = arangoDriver;
    }

    @Bean
    @Named("ArangoDriver")
    public ArangoDriver getDriver() {
        return driver;
    }

    public void setDriver(ArangoDriver driver) {
        this.driver = driver;
    }
}
