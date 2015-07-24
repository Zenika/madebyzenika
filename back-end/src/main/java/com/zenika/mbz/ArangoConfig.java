package com.zenika.mbz;

import com.arangodb.ArangoConfigure;
import com.arangodb.ArangoDriver;
import com.arangodb.ArangoHost;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

import javax.inject.Named;

@Configuration
@PropertySource("classpath:datasource.properties")
public class ArangoConfig {

    public ArangoDriver driver;

    @Value("${datasource.host}")
    private String host;

    @Value("${datasource.port}")
    private Integer port;

    @Value("${datasource.database}")
    private String database;

    @Bean
    @Named("ArangoDriver")
    public ArangoDriver getDriver() {
        // Initialize configure
        ArangoConfigure configure = new ArangoConfigure();
        configure.setArangoHost(new ArangoHost(this.host, this.port));
        configure.init();

        // Create Driver (this instance is thread-safe)
        ArangoDriver arangoDriver = new ArangoDriver(configure);
        arangoDriver.setDefaultDatabase(this.database);
        return arangoDriver;
    }

    public void setDriver(ArangoDriver driver) {
        this.driver = driver;
    }

}
