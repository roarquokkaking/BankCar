package search.service;

import java.util.*;
import java.sql.Time;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import search.bean.SearchDTO;
import search.dao.SearchDAO;
import search.repository.SearchRepository;

@Transactional
@Service
public class SearchServiceImpl implements SearchService {
    @Autowired
    private SearchDAO searchDAO;

    @Autowired
    private SearchRepository searchRepository;

    @Override
    public List<SearchDTO> getSearchList(SearchDTO searchDTO) {
        List<SearchDTO> list = searchDAO.findAll();
        return list;
    }

    @Override
    public Map<String, Object> search(Map<String, Object> params) {
        Date startDate = (Date) params.get("startDate");
        Date endDate = (Date) params.get("endDate");
        Time startTime = (Time) params.get("startTime");
        Time endTime = (Time) params.get("endTime");
        String jibun_Address = (String) params.get("jibunAddress");
        String road_Address = (String) params.get("roadAddress");
        String x = (String) params.get("x");
        String y = (String) params.get("y");
        int minPrice = (int) params.get("minPrice");
        int maxPrice = (int) params.get("maxPrice");
        // JPA를 사용하여 엔티티 검색
        Optional<SearchDTO> searchEntityOptional = searchRepository.findCarByServiceDatesAndTimesAndPriceRange(
            startDate, endDate, startTime, endTime,minPrice, maxPrice);

        Map<String, Object> result = new HashMap<>();
        if (searchEntityOptional.isPresent()) {
            SearchDTO SearchDTO = searchEntityOptional.get();
            result.put("startDate", startDate);
            result.put("endDate", endDate);
            result.put("startTime", startTime);
            result.put("endTime", endTime);
            // result.put("jibunAddress", SearchDTO.getJibunAddress());
            // result.put("roadAddress", SearchDTO.getRoadAddress());
            // result.put("x", SearchDTO.getLongitude());
            // result.put("y", SearchDTO.getLatitude());
            result.put("carId", SearchDTO.getCarId());
            // 기타 필요한 필드 추가
        }

        return result;
    }
    
}
