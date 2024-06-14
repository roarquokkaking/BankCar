package search.service;

import java.util.*;

import search.bean.SearchDTO;

public interface SearchService {

    List<SearchDTO> getSearchList(SearchDTO searchDTO);

    Map<String, Object> search(Map<String, Object> params);
    
}
