/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Record.java to edit this template
 */
package com.codelian.buscadorcep.model;

public record EnderecoResposta(
        String cep,
        String logradouro,
        String bairro,
        String localidade,
        String uf
) {
}