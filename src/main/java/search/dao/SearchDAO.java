package search.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import search.bean.SearchDTO;

@Repository
public interface SearchDAO extends JpaRepository<SearchDTO,Integer> {

    
}
    