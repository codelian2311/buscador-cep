/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.codelian.buscadorcep.controller;

import com.codelian.buscadorcep.model.EnderecoResposta;
import com.codelian.buscadorcep.service.ViaCepService;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = {
    "https://codelian2311.github.io",
    "http://localhost:5500",
    "http://127.0.0.1:5500"
})
@RestController
public class CepController {

    private final ViaCepService viaCepService;

    public CepController(ViaCepService viaCepService) {

        this.viaCepService = viaCepService;
    }

    @GetMapping("/api/teste")
    public String testarApi() {

        return "Back-end funcionando!";
    }

    @GetMapping("/api/cep")
    public EnderecoResposta[] buscarCep(
            @RequestParam String rua) {

        return viaCepService.buscarPorRua(rua);
    }
}