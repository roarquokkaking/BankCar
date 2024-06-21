package search.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface SearchService {

   // List<SearchDTO> getSearchList(SearchDTO searchDTO);

   List<Long> searchId(LocalDate startDate, LocalDate endDate, LocalTime startTime, LocalTime endTime, int minPrice, int maxPrice);

}
