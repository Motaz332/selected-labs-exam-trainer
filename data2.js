/* ============================ EXAMS 7-9: EXTRA (written by me, doctor's midterm style) ============================ */

EXAMS.push({
  name: "Extra 1",
  src: "Written by me - style of the doctor's midterm",
  mcq: [
    ["What is the output?", ["A B", "A A", "B B", "Compilation error"], 2, "Reference type is A, but the object is B and show() is overridden: runtime polymorphism prints B.",
`class A { void show(){ System.out.print("A "); } }
class B extends A { void show(){ System.out.print("B "); } }
// main:
A x = new B();
A y = new B();
x.show(); y.show();`],
    ["Which principle is violated?", ["SRP", "OCP", "DIP", "ISP"], 2, "OrderService (high-level) creates the concrete MySqlDb itself. It should depend on an abstraction (Database) injected from outside.",
`class MySqlDb { void save(String d){ } }
class OrderService {
    private MySqlDb db = new MySqlDb();
    void placeOrder(String o){ db.save(o); }
}`],
    ["What does this code print?", ["true", "false", "Compilation error", "NullPointerException"], 0, "Both calls return the same single instance, so == is true.",
`class Config {
    private static Config inst;
    private Config(){ }
    static Config getInstance(){ if (inst == null) inst = new Config(); return inst; }
}
// main:
System.out.println(Config.getInstance() == Config.getInstance());`],
    ["What is the compile result of 'Config c = new Config();' inside main of ANOTHER class (using the Config above)?", ["Works", "Compilation error: constructor is private", "Runtime error", "Returns null"], 1, "A private constructor cannot be called from outside the class."],
    ["Which refactor best removes the OCP violation?", ["Add another else-if", "Make area() static", "Create abstract Shape with area() and one subclass per shape", "Use a switch instead of if"], 2, "Switch/if chains still need modification for each new shape.",
`double area(Object s) {
    if (s instanceof Circle) return ...;
    else if (s instanceof Square) return ...;
    return 0;
}`],
    ["In a simple Factory, where does the 'new Truck()' call belong?", ["In the client", "Inside the factory", "In the Truck's parent constructor", "In main always"], 1, "The factory encapsulates creation."],
    ["Which statement about an abstract class is TRUE?", ["It can be instantiated with new", "It can contain both abstract and concrete methods", "It cannot have constructors", "It cannot have fields"], 1, "Abstract classes can have fields, constructors and concrete methods, but cannot be instantiated directly."],
    ["Which is the drawback of an eager Singleton?", ["It is not thread-safe", "It can waste resources if never used", "It allows two instances", "It needs a public constructor"], 1, "It is created at startup even if unused."]
  ],
  tf: [
    ["Interface attributes are final constants by default.", true, "public static final implicitly."],
    ["A constructor can be overridden by a subclass.", false, "Constructors are not inherited, so they cannot be overridden."],
    ["Singleton and Factory both belong to the creational patterns.", true, "Yes."],
    ["In lazy Singleton, getInstance() creates the object on every call.", false, "Only when the reference is null."],
    ["Following the SRP means a class should have only one method.", false, "It means one responsibility, which can use many methods."],
    ["A subclass reference can always be assigned to a superclass variable.", true, "Upcasting is implicit."]
  ],
  essay: [
    ["1) Design a Factory Pattern to create vehicles (Car, Bike, Truck). Create an abstract class Vehicle with abstract method move(), concrete subclasses, a VehicleFactory with a static method getVehicle(String type), and main that creates and moves each. (5 Marks)",
`abstract class Vehicle {
    abstract void move();
}

class Car extends Vehicle {
    @Override void move() { System.out.println("Car is driving."); }
}

class Bike extends Vehicle {
    @Override void move() { System.out.println("Bike is pedaling."); }
}

class Truck extends Vehicle {
    @Override void move() { System.out.println("Truck is hauling cargo."); }
}

class VehicleFactory {
    public static Vehicle getVehicle(String type) {
        switch (type.toLowerCase()) {
            case "car":   return new Car();
            case "bike":  return new Bike();
            case "truck": return new Truck();
            default:
                System.out.println("Invalid vehicle type!");
                return null;
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Vehicle v1 = VehicleFactory.getVehicle("car");
        if (v1 != null) v1.move();
        Vehicle v2 = VehicleFactory.getVehicle("bike");
        if (v2 != null) v2.move();
        Vehicle v3 = VehicleFactory.getVehicle("truck");
        if (v3 != null) v3.move();
    }
}`],
    ["2) Create a Logger class using the Lazy Singleton pattern. It stores log messages in a list; log(String) adds a message with its number; printAll() prints all messages. Test it in main to prove two references are the same object. (5 Marks)",
`import java.util.ArrayList;
import java.util.List;

class Logger {
    private static Logger instance;                 // private static reference
    private List<String> messages = new ArrayList<>();

    private Logger() { }                            // private constructor

    public static Logger getInstance() {
        if (instance == null) {                     // lazy creation
            instance = new Logger();
        }
        return instance;
    }

    public void log(String msg) {
        messages.add((messages.size() + 1) + ": " + msg);
    }

    public void printAll() {
        for (String m : messages) System.out.println(m);
    }
}

public class LoggerTest {
    public static void main(String[] args) {
        Logger a = Logger.getInstance();
        Logger b = Logger.getInstance();
        a.log("Server started");
        b.log("User logged in");
        a.printAll();                               // shows both messages
        System.out.println(a == b);                 // true
    }
}`],
    ["3) Apply SRP. Refactor the class below into separate classes, each with one responsibility, and show how main uses them together.\n\nclass Employee {\n    String name; double salary;\n    double calculateTax() { return salary * 0.1; }\n    void saveToDatabase() { /* save */ }\n    void printReport() { /* print */ }\n}",
`class Employee {                         // holds data + its own business logic
    private String name;
    private double salary;

    public Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }
    public String getName()  { return name; }
    public double getSalary(){ return salary; }
    public double calculateTax() { return salary * 0.1; }
}

class EmployeeRepository {               // only persistence
    public void save(Employee e) {
        System.out.println("Saving " + e.getName() + " to database");
    }
}

class EmployeeReportPrinter {            // only reporting
    public void print(Employee e) {
        System.out.println("Employee: " + e.getName() + " | Tax: " + e.calculateTax());
    }
}

public class Main {
    public static void main(String[] args) {
        Employee e = new Employee("Ali", 5000);
        new EmployeeRepository().save(e);
        new EmployeeReportPrinter().print(e);
    }
}`]
  ]
});

EXAMS.push({
  name: "Extra 2",
  src: "Written by me - style of the doctor's midterm",
  mcq: [
    ["What is the output?", ["10 20", "20 20", "10 10", "Compilation error"], 0, "Overloading: one argument selects add(int a) which returns a*10, so 1 gives 10 and 2 gives 20.",
`class Calc {
    int add(int a) { return a * 10; }
    int add(int a, int b) { return a + b; }
}
// main:
Calc c = new Calc();
System.out.print(c.add(1) + " ");
System.out.print(c.add(2));`],
    ["Which principle does this code violate?", ["SRP", "LSP", "ISP", "DIP"], 1, "ElectricCar cannot replace Car because refuel() throws. Fix: separate Refuelable from Car.",
`class Car { void refuel(){ } }
class ElectricCar extends Car {
    void refuel(){ throw new UnsupportedOperationException(); }
}`],
    ["Which Singleton type is this?", ["Lazy", "Eager", "Factory", "Structural"], 1, "The instance is created at class loading in the declaration.",
`class Settings {
    private static final Settings INSTANCE = new Settings();
    private Settings(){ }
    public static Settings getInstance(){ return INSTANCE; }
}`],
    ["Which refactor fixes the OCP violation below?", ["Make calc() final", "Add more if branches", "Interface Discount with apply(); one class per discount", "Use static methods"], 2, "Each new discount is a new class, so DiscountCalculator never changes.",
`double calc(String type, double p) {
    if (type.equals("XMAS")) return p * 0.75;
    else if (type.equals("NEWYEAR")) return p * 0.80;
    return p;
}`],
    ["Which keyword makes a class unable to be extended?", ["static", "abstract", "final", "private"], 2, "final class cannot be subclassed."],
    ["A client calls factory.create(2) and gets a Bird. Which statement is right?", ["The client calls new Bird()", "The factory decides and creates the Bird", "Bird is a Singleton", "The client must know Bird"], 1, "Factory encapsulates creation."],
    ["Which is 'has-a'?", ["Inheritance", "Composition", "Overriding", "Overloading"], 1, "Car has an Engine = composition."]
  ],
  tf: [
    ["Method overloading requires different parameter lists.", true, "Same name, different parameters."],
    ["A static getInstance() method is needed because we cannot create the object from outside.", true, "No object exists to call an instance method on."],
    ["DIP says high-level modules should depend on low-level modules.", false, "Both should depend on abstractions."],
    ["Eager Singleton is created when getInstance() is first called.", false, "At startup/class load."],
    ["An interface can extend another interface.", true, "Yes, with extends."],
    ["The ISP is violated when a class is forced to implement methods it does not use.", true, "Yes."]
  ],
  essay: [
    ["1) Create an Eager Singleton class AppConfig holding an appName (String) with a getter and setter. In main prove that two calls return the same object and that a change via one reference is seen by the other. (5 Marks)",
`class AppConfig {
    private static final AppConfig INSTANCE = new AppConfig();   // eager: created at class load
    private String appName = "MyApp";

    private AppConfig() { }

    public static AppConfig getInstance() { return INSTANCE; }

    public String getAppName() { return appName; }
    public void setAppName(String appName) { this.appName = appName; }
}

public class Main {
    public static void main(String[] args) {
        AppConfig a = AppConfig.getInstance();
        AppConfig b = AppConfig.getInstance();
        a.setAppName("Exam Trainer");
        System.out.println(b.getAppName());      // Exam Trainer
        System.out.println(a == b);              // true
    }
}`],
    ["2) Apply OCP. Refactor the code below so a new discount type can be added WITHOUT modifying the calculator. Include main.\n\nclass DiscountCalculator {\n    double calc(String type, double price) {\n        if (type.equals(\"XMAS\")) return price * 0.75;\n        else if (type.equals(\"NEWYEAR\")) return price * 0.80;\n        else return price;\n    }\n}",
`interface Discount {
    double apply(double price);
}

class ChristmasDiscount implements Discount {
    public double apply(double price) { return price * 0.75; }
}

class NewYearDiscount implements Discount {
    public double apply(double price) { return price * 0.80; }
}

class NoDiscount implements Discount {
    public double apply(double price) { return price; }
}

class DiscountCalculator {                       // closed for modification
    public double calc(Discount d, double price) {
        return d.apply(price);
    }
}

public class Main {
    public static void main(String[] args) {
        DiscountCalculator calc = new DiscountCalculator();
        System.out.println(calc.calc(new ChristmasDiscount(), 100)); // 75.0
        System.out.println(calc.calc(new NewYearDiscount(), 100));   // 80.0
        // New type: just add a new class implementing Discount
    }
}`],
    ["3) Apply LSP. Fix the design below so that no subclass throws for an inherited method. Show the classes and a main that calls the right behavior.\n\nclass Bird { void fly(){ } void eat(){ } }\nclass Penguin extends Bird { void fly(){ throw new UnsupportedOperationException(); } }",
`class Bird {                                   // only behavior ALL birds share
    void eat() { System.out.println("Bird eats"); }
}

interface Flyable {                            // only flying birds implement it
    void fly();
}

class Sparrow extends Bird implements Flyable {
    @Override public void fly() { System.out.println("Sparrow flies"); }
}

class Penguin extends Bird {
    // no broken fly() method any more
    void swim() { System.out.println("Penguin swims"); }
}

public class Main {
    public static void main(String[] args) {
        Bird b1 = new Sparrow();
        Bird b2 = new Penguin();
        b1.eat();
        b2.eat();                               // both substitute Bird safely
        if (b1 instanceof Flyable) ((Flyable) b1).fly();
    }
}`]
  ]
});

EXAMS.push({
  name: "Extra 3",
  src: "Written by me - style of the doctor's midterm",
  mcq: [
    ["What is the output?", ["Hi from base", "Hi from child", "Compilation error", "Nothing"], 1, "Dynamic dispatch uses the actual object's class (Child).",
`class Base { void hi(){ System.out.println("Hi from base"); } }
class Child extends Base { void hi(){ System.out.println("Hi from child"); } }
// main:
Base b = new Child();
b.hi();`],
    ["Which principle is violated?", ["ISP", "OCP", "SRP", "LSP"], 0, "Robot is forced to implement eat(). Split Worker into Workable and Eatable.",
`interface Worker { void work(); void eat(); }
class Robot implements Worker {
    public void work(){ }
    public void eat(){ throw new UnsupportedOperationException(); }
}`],
    ["How do you make Notifier follow DIP?", ["Keep 'new EmailSender()' inside Notifier", "Make Notifier depend on a MessageSender interface injected via constructor", "Make EmailSender static", "Add more methods to EmailSender"], 1, "Depend on an abstraction and inject it.",
`class EmailSender { void send(String m){ } }
class Notifier {
    private EmailSender sender = new EmailSender();
    void notify(String m){ sender.send(m); }
}`],
    ["What problem happens here with two threads?", ["No problem", "Two instances may be created", "Deadlock always", "The constructor becomes public"], 1, "Both threads may see null at the same time before either assigns. Fix: synchronized getInstance() or eager creation.",
`public static Db getInstance() {
    if (inst == null) {
        inst = new Db();
    }
    return inst;
}`],
    ["In the Factory lab style, which constants are used?", ["public static final int IDs in the factory", "private non-static strings", "Random numbers", "Global variables"], 0, "e.g. TURTLE = 1, BIRD = 2 and a switch(id) in createEnemy(int id)."],
    ["Which one is an example of encapsulation?", ["public fields everywhere", "private field with getter/setter containing validation", "Overloading a constructor", "Using abstract classes"], 1, "Private data + controlled access."],
    ["Which design pattern category does Factory belong to?", ["Structural", "Behavioral", "Creational", "Architectural"], 2, "Creational."]
  ],
  tf: [
    ["A Singleton may still be broken by creating a second object with a public constructor.", true, "That is why the constructor must be private."],
    ["The Factory pattern should be used for every single 'new' in the program.", false, "Only when creation logic benefits from encapsulation."],
    ["A class can implement more than one interface.", true, "Yes."],
    ["A class can extend more than one class in Java.", false, "Single inheritance for classes."],
    ["The Open/Closed Principle means classes cannot ever be edited.", false, "It means new behavior should be added by extension rather than by editing tested code."],
    ["Dependency injection helps follow the Dependency Inversion Principle.", true, "Dependencies are given from outside as abstractions."]
  ],
  essay: [
    ["1) Apply ISP. Split the fat interface below so that BasicPrinter only implements printing while OfficeMachine does all three. Include main.\n\ninterface Machine { void print(); void scan(); void fax(); }",
`interface Printable { void print(); }
interface Scannable { void scan(); }
interface Faxable   { void fax(); }

class BasicPrinter implements Printable {
    public void print() { System.out.println("Printing..."); }
}

class OfficeMachine implements Printable, Scannable, Faxable {
    public void print() { System.out.println("Printing..."); }
    public void scan()  { System.out.println("Scanning..."); }
    public void fax()   { System.out.println("Faxing..."); }
}

public class Main {
    public static void main(String[] args) {
        Printable p = new BasicPrinter();
        p.print();
        OfficeMachine m = new OfficeMachine();
        m.print(); m.scan(); m.fax();
    }
}`],
    ["2) Apply DIP. Create a Switch that can turn on any Switchable device (Light and Fan). Use an interface and constructor injection, and test both in main. (5 Marks)",
`interface Switchable {
    void turnOn();
}

class Light implements Switchable {
    public void turnOn() { System.out.println("Light is on"); }
}

class Fan implements Switchable {
    public void turnOn() { System.out.println("Fan is spinning"); }
}

class Switch {
    private Switchable device;                  // depends on the abstraction

    public Switch(Switchable device) {          // constructor injection
        this.device = device;
    }

    public void press() { device.turnOn(); }
}

public class Main {
    public static void main(String[] args) {
        new Switch(new Light()).press();
        new Switch(new Fan()).press();
    }
}`],
    ["3) Lab-style Factory. Create abstract class Sandwich (name, calories, abstract prepare()), subclasses CheeseBurger (150) and ChickenBurger (200), and SandwichFactory with constants CHEESE_BURGER = 1, CHICKEN_BURGER = 2 and createSandwich(int id) using a switch. Show main. (5 Marks)",
`abstract class Sandwich {
    protected String name;
    protected int calories;
    public abstract void prepare();
}

class CheeseBurger extends Sandwich {
    public CheeseBurger() { name = "Cheese Burger"; calories = 150; }
    @Override public void prepare() {
        System.out.println("Preparing " + name + " (" + calories + " cal)");
    }
}

class ChickenBurger extends Sandwich {
    public ChickenBurger() { name = "Chicken Burger"; calories = 200; }
    @Override public void prepare() {
        System.out.println("Preparing " + name + " (" + calories + " cal)");
    }
}

class SandwichFactory {
    public static final int CHEESE_BURGER = 1;
    public static final int CHICKEN_BURGER = 2;

    public static Sandwich createSandwich(int id) {
        switch (id) {
            case CHEESE_BURGER:  return new CheeseBurger();
            case CHICKEN_BURGER: return new ChickenBurger();
            default:             return null;
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Sandwich s = SandwichFactory.createSandwich(SandwichFactory.CHICKEN_BURGER);
        if (s != null) s.prepare();
    }
}`]
  ]
});
