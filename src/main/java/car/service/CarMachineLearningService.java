package car.service;

import weka.classifiers.Classifier;
import weka.classifiers.functions.LinearRegression;
import weka.core.Attribute;
import weka.core.DenseInstance;
import weka.core.Instances;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import car.entity.Car;

import java.util.ArrayList;
import java.util.List;

@Service
public class CarMachineLearningService {
    @Autowired
    private CarRegistrationServiceImpl carRegistrationServiceImpl;

    private Classifier model;

    public void trainModel() throws Exception {
        List<Car> cars = carRegistrationServiceImpl.getAllCars();

        // Attributes for the dataset
        ArrayList<Attribute> attributes = new ArrayList<>();
        attributes.add(new Attribute("doroAddress", (ArrayList<String>) null));  // Nominal attribute
        attributes.add(new Attribute("model", (ArrayList<String>) null));       // Nominal attribute
        attributes.add(new Attribute("category", (ArrayList<String>) null));    // Nominal attribute
        attributes.add(new Attribute("rating"));
        attributes.add(new Attribute("price"));

        Instances trainingData = new Instances("TrainingData", attributes, cars.size());
        trainingData.setClassIndex(trainingData.numAttributes() - 1);

        for (Car car : cars) {
            DenseInstance instance = new DenseInstance(trainingData.numAttributes());
            instance.setValue(attributes.get(0), car.getDoroAddress());
            instance.setValue(attributes.get(1), car.getModel());
            instance.setValue(attributes.get(2), car.getCategory());
            instance.setValue(attributes.get(3), car.getRating());
            instance.setValue(attributes.get(4), car.getPrice());
            trainingData.add(instance);
        }

        model = new LinearRegression();
        model.buildClassifier(trainingData);
    }

    public double predictPrice(String doroAddress, String model, String category, double rating) throws Exception {
        ArrayList<Attribute> attributes = new ArrayList<>();
        attributes.add(new Attribute("doroAddress", (ArrayList<String>) null));
        attributes.add(new Attribute("model", (ArrayList<String>) null));
        attributes.add(new Attribute("category", (ArrayList<String>) null));
        attributes.add(new Attribute("rating"));
        attributes.add(new Attribute("price"));

        Instances testData = new Instances("TestData", attributes, 1);
        testData.setClassIndex(testData.numAttributes() - 1);

        DenseInstance instance = new DenseInstance(testData.numAttributes());
        instance.setValue(attributes.get(0), doroAddress);
        instance.setValue(attributes.get(1), model);
        instance.setValue(attributes.get(2), category);
        instance.setValue(attributes.get(3), rating);
        testData.add(instance);

        return this.model.classifyInstance(testData.firstInstance());
    }
}
