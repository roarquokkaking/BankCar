package search.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import search.bean.SearchDTO;
import search.dao.SearchDAO;

@Transactional
@Service
public class SearchServiceImpl implements SearchService {
    @Autowired
    private SearchDAO searchDAO;

    @Override
    public List<SearchDTO> getSearchList(SearchDTO searchDTO) {
        List<SearchDTO> list = searchDAO.findAll();
        return list;
    }
    
}
