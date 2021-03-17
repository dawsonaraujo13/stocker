package com.stocker.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stocker.api.model.Stock;
import com.stocker.api.repository.StockRepository;

@Service
public class StockService {
	@Autowired
	private StockRepository repository;
	
	public Stock saveStock(Stock stock) {
		return repository.save(stock);
	}
	
	public List<Stock> saveStocks(List<Stock> stocks) {
		return repository.saveAll(stocks);
	}
	
	public List<Stock> getStocks() {
		return repository.findAll();
	}
	
	public Stock getStock(int id) {
		return repository.findById(id).orElse(null);
	}
	
	public String deleteStock(int id) {
		repository.deleteById(id);
		return "Removed Stock with ID: " + id;
	}
	
	public Stock updateStock(Stock stock) {
		Stock existingStock = repository.findById(stock.getId()).orElse(null);
		existingStock.setCompany(stock.getCompany());
		existingStock.setPrice(stock.getPrice());
		existingStock.setSymbol(stock.getSymbol());
		existingStock.setUrl(stock.getUrl());
		return repository.save(existingStock);
	}
	
}
