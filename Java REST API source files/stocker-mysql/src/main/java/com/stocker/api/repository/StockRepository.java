package com.stocker.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stocker.api.model.Stock;

public interface StockRepository extends JpaRepository<Stock,Integer>{
	
}
