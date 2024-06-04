package search.service;

import java.util.List;

import search.bean.SearchDTO;

public interface SearchService {

    List<SearchDTO> getSearchList(SearchDTO searchDTO);
    
}
