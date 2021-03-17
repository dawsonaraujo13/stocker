package com.stocker.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.stocker.api.model.Stock;
import com.stocker.api.service.StockService;


@RestController
@CrossOrigin
public class StockController {
	
	@Autowired
	private StockService service;
	
	@PostMapping("/addStock")
	public Stock addStock(@RequestBody Stock stock) {
		return service.saveStock(stock);
	}
	
	@PostMapping("/addStocks")
	public List<Stock> addStocks(@RequestBody List<Stock> stocks){
		return service.saveStocks(stocks);
	}
	
	@GetMapping("/stocks")
	public List<Stock> findAllStocks(){
		return service.getStocks();
	}
	
	@GetMapping("/stock/{id}")
	public Stock findStockById(@PathVariable int id) {
		return service.getStock(id);
	}
	
	@PutMapping("/update")
	public Stock updateStock(@RequestBody Stock stock) {
		return service.updateStock(stock);
	}
	
	@DeleteMapping("/delete/{id}")
	public String deleteStock(@PathVariable int id) {
		return service.deleteStock(id);
	}
}
