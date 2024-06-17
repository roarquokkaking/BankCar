package spark;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SparkService {

    @Autowired
    private JavaSparkContext javaSparkContext;

    public void runExample() {
        JavaRDD<String> data = javaSparkContext.textFile("./src/main/python/cardata.txt");
        long count = data.count();
        System.out.println("Number of lines in the file: " + count);
    }
}
