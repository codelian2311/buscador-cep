/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.codelian.buscadorcep.service;

import com.codelian.buscadorcep.model.EnderecoResposta;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class ViaCepService {

    private final RestClient restClient;

    public ViaCepService() {

        this.restClient = RestClient.create(
                "https://viacep.com.br"
        );
    }

    public EnderecoResposta[] buscarPorRua(String rua) {

        return restClient
                .get()
                .uri(uriBuilder -> uriBuilder
                        .pathSegment(
                                "ws",
                                "PR",
                                "Vera Cruz do Oeste",
                                rua,
                                "json"
                        )
                        .build()
                )
                .retrieve()
                .body(EnderecoResposta[].class);
    }
}