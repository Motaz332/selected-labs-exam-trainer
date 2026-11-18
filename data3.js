/* ============================ ESSAY BANK: coding questions based on the labs ============================ */
EXAMS.push({
  name: "ESSAY BANK (34 coding)",
  src: "Coding questions on OOP, SOLID, Singleton and Factory, modeled on the lab examples. Write in the box, then press Show answer.",
  mcq: [], tf: [],
  essay: [

/* ---------- OOP ---------- */
["OOP 1) Write an abstract class Employee (name, SSN) with an abstract method earning() and a toString(). Write HourlyEmployee (hours, rate) that extends it. In main, store an HourlyEmployee in an Employee reference and print its earning.",
`abstract class Employee {
    private String name;
    private int SSN;

    public Employee(String name, int SSN) {
        this.name = name;
        this.SSN = SSN;
    }

    public abstract double earning();

    @Override
    public String toString() {
        return "Employee{name=" + name + ", SSN=" + SSN + "}";
    }
}

class HourlyEmployee extends Employee {
    private int hours;
    private double rate;

    public HourlyEmployee(String name, int SSN, int hours, double rate) {
        super(name, SSN);
        this.hours = hours;
        this.rate = rate;
    }

    @Override
    public double earning() { return hours * rate; }
}

public class Main {
    public static void main(String[] args) {
        Employee e = new HourlyEmployee("Ali", 1, 40, 50);   // polymorphism
        System.out.println(e);
        System.out.println(e.earning());                      // 2000.0
    }
}`],

["OOP 2) Given CommissionEmployee (grossSales, commissionRate, earning() = grossSales * commissionRate), write BasePlusCommissionEmployee that adds a base salary and reuses the parent's earning() through super.",
`class CommissionEmployee extends Employee {
    protected double grossSales;
    protected double commissionRate;

    public CommissionEmployee(String name, int SSN, double grossSales, double commissionRate) {
        super(name, SSN);
        this.grossSales = grossSales;
        this.commissionRate = commissionRate;
    }

    @Override
    public double earning() { return grossSales * commissionRate; }
}

class BasePlusCommissionEmployee extends CommissionEmployee {
    private double base;

    public BasePlusCommissionEmployee(String name, int SSN, double grossSales,
                                      double commissionRate, double base) {
        super(name, SSN, grossSales, commissionRate);
        this.base = base;
    }

    @Override
    public double earning() {
        return super.earning() + base;     // reuse parent calculation
    }
}`],

["OOP 3) Write an interface Displayable with constants COMPANY_NAME and FAX and the methods displaydetail() and displayearnings(). Write SalariedEmployee (salary, bonus, deductions) that extends Employee and implements Displayable. earning() = (salary + bonus) - deductions.",
`interface Displayable {
    String COMPANY_NAME = "ABDC";      // public static final by default
    String FAX = "0158854";

    void displaydetail();              // public abstract by default
    void displayearnings();
}

class SalariedEmployee extends Employee implements Displayable {
    private double salary, bonus, deductions;

    public SalariedEmployee(String name, int SSN, double salary, double bonus, double deductions) {
        super(name, SSN);
        this.salary = salary;
        this.bonus = bonus;
        this.deductions = deductions;
    }

    @Override
    public double earning() { return (salary + bonus) - deductions; }

    @Override
    public void displaydetail() {
        System.out.println(COMPANY_NAME + " (fax " + FAX + ")");
        System.out.println(super.toString());
    }

    @Override
    public void displayearnings() {
        System.out.println("The total earning is " + earning());
    }
}`],

["OOP 4) Write a class MathUtil that demonstrates method OVERLOADING (three versions of sum: two ints, three ints, two doubles). Then write Animal and Dog classes that demonstrate method OVERRIDING (speak()). Show both in main.",
`class MathUtil {
    int sum(int a, int b)             { return a + b; }
    int sum(int a, int b, int c)      { return a + b + c; }
    double sum(double a, double b)    { return a + b; }
}

class Animal {
    String speak() { return "Some sound"; }
}

class Dog extends Animal {
    @Override
    String speak() { return "Bark"; }
}

public class Main {
    public static void main(String[] args) {
        MathUtil m = new MathUtil();
        System.out.println(m.sum(1, 2));          // 3
        System.out.println(m.sum(1, 2, 3));       // 6
        System.out.println(m.sum(1.5, 2.5));      // 4.0

        Animal a = new Dog();                     // runtime polymorphism
        System.out.println(a.speak());            // Bark
    }
}`],

["OOP 5) Write a BankAccount class that demonstrates encapsulation: private balance, getBalance(), deposit(amount) that rejects non-positive amounts, and withdraw(amount) that rejects amounts above the balance.",
`class BankAccount {
    private double balance;

    public double getBalance() { return balance; }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
        }
    }
}`],

/* ---------- SRP ---------- */
["SRP 1) The class below has 3 responsibilities. Split it into Customer, CustomerDB and CustomerReportGenerator.\n\nclass Customer {\n    private String name, email;\n    void update_name_email(String n, String e) { name = n; email = e; }\n    void storecustomer() { /* save to database */ }\n    void generateCustomerReport() { /* print report */ }\n}",
`class Customer {                                  // only customer data
    private String name, email;

    public void update_name_email(String n, String e) { name = n; email = e; }
    public String getName()  { return name; }
    public String getEmail() { return email; }
}

class CustomerDB {                                // only persistence
    public void storecustomer(Customer c) {
        System.out.println("Saving " + c.getName() + " to the database");
    }
}

class CustomerReportGenerator {                   // only reporting
    public void generateCustomerReport(Customer c) {
        System.out.println("Report: " + c.getName() + " - " + c.getEmail());
    }
}`],

["SRP 2) Apply SRP to this class and write a main that uses the new classes.\n\nclass Student {\n    String name; double[] grades;\n    double calculateAverage() { ... }\n    void saveToFile() { ... }\n    void printTranscript() { ... }\n}",
`class Student {
    private String name;
    private double[] grades;

    public Student(String name, double[] grades) { this.name = name; this.grades = grades; }
    public String getName() { return name; }

    public double calculateAverage() {
        double sum = 0;
        for (double g : grades) sum += g;
        return grades.length == 0 ? 0 : sum / grades.length;
    }
}

class StudentRepository {
    public void saveToFile(Student s) {
        System.out.println("Saving " + s.getName() + " to file");
    }
}

class TranscriptPrinter {
    public void print(Student s) {
        System.out.println(s.getName() + " average: " + s.calculateAverage());
    }
}

public class Main {
    public static void main(String[] args) {
        Student s = new Student("Sara", new double[]{80, 90, 100});
        new StudentRepository().saveToFile(s);
        new TranscriptPrinter().print(s);      // average: 90.0
    }
}`],

["SRP 3) Refactor this class into three classes: Order (data + total), EmailService (sends confirmation) and OrderRepository (saves).\n\nclass Order {\n    double price; int qty;\n    double calculateTotalPrice() { return price * qty; }\n    void saveToDatabase() { }\n    void sendOrderConfirmation() { }\n}",
`class Order {
    private double price;
    private int qty;

    public Order(double price, int qty) { this.price = price; this.qty = qty; }
    public double calculateTotalPrice() { return price * qty; }
}

class OrderRepository {
    public void saveToDatabase(Order o) {
        System.out.println("Order saved. Total = " + o.calculateTotalPrice());
    }
}

class EmailService {
    public void sendOrderConfirmation(Order o) {
        System.out.println("Confirmation email sent. Total = " + o.calculateTotalPrice());
    }
}`],

/* ---------- OCP ---------- */
["OCP 1) ShapePrinter uses instanceof for Rectangle and Square. Refactor with an abstract Shape so a Triangle can be added without changing ShapePrinter. Show Rectangle, Square, Triangle and main.",
`abstract class Shape {
    public abstract void draw();
}

class Rectangle extends Shape {
    @Override public void draw() { System.out.println("Drawing a Rectangle"); }
}

class Square extends Shape {
    @Override public void draw() { System.out.println("Drawing a Square"); }
}

class Triangle extends Shape {              // added later, nothing else changes
    @Override public void draw() { System.out.println("Drawing a Triangle"); }
}

class ShapePrinter {
    public void drawShape(Shape shape) {
        shape.draw();                        // closed for modification
    }
}

public class Main {
    public static void main(String[] args) {
        ShapePrinter p = new ShapePrinter();
        p.drawShape(new Rectangle());
        p.drawShape(new Square());
        p.drawShape(new Triangle());
    }
}`],

["OCP 2) Refactor this PaymentProcessor so that a new payment type (e.g. VodafoneCash) can be added without editing it.\n\nclass PaymentProcessor {\n    void processPayment(String type, double amount) {\n        if (type.equals(\"CreditCard\")) { /* card logic */ }\n        else if (type.equals(\"PayPal\")) { /* paypal logic */ }\n    }\n}",
`interface PaymentMethod {
    void pay(double amount);
}

class CreditCard implements PaymentMethod {
    public void pay(double amount) { System.out.println("Credit card paid " + amount); }
}

class PayPal implements PaymentMethod {
    public void pay(double amount) { System.out.println("PayPal paid " + amount); }
}

class VodafoneCash implements PaymentMethod {      // new type = new class only
    public void pay(double amount) { System.out.println("Vodafone Cash paid " + amount); }
}

class PaymentProcessor {
    public void processPayment(PaymentMethod method, double amount) {
        method.pay(amount);
    }
}`],

["OCP 3) Refactor this TaxCalculator following OCP. Include classes for US (30%) and EU (25%) and a main.\n\nclass TaxCalculator {\n    double calculateTax(String region, double income) {\n        if (region.equals(\"US\")) return income * 0.3;\n        else if (region.equals(\"EU\")) return income * 0.25;\n        return 0;\n    }\n}",
`abstract class TaxCalculator {
    public abstract double calculateTax(double income);
}

class USTax extends TaxCalculator {
    @Override public double calculateTax(double income) { return income * 0.30; }
}

class EUTax extends TaxCalculator {
    @Override public double calculateTax(double income) { return income * 0.25; }
}

public class Main {
    public static void main(String[] args) {
        TaxCalculator t1 = new USTax();
        TaxCalculator t2 = new EUTax();
        System.out.println(t1.calculateTax(1000));   // 300.0
        System.out.println(t2.calculateTax(1000));   // 250.0
    }
}`],

["OCP 4) Refactor the Logger below (File / Console) following OCP, using an interface. Add a third logger of your choice without touching existing classes.\n\nclass Logger {\n    void log(String type, String msg) {\n        if (type.equals(\"File\")) { /* write to file */ }\n        else if (type.equals(\"Console\")) { /* print */ }\n    }\n}",
`interface Logger {
    void log(String message);
}

class FileLogger implements Logger {
    public void log(String message) { System.out.println("[FILE] " + message); }
}

class ConsoleLogger implements Logger {
    public void log(String message) { System.out.println("[CONSOLE] " + message); }
}

class DatabaseLogger implements Logger {            // the added one
    public void log(String message) { System.out.println("[DB] " + message); }
}

public class Main {
    public static void main(String[] args) {
        Logger l = new DatabaseLogger();
        l.log("hello");
    }
}`],

/* ---------- LSP ---------- */
["LSP 1) Penguin extends Bird and throws in fly(). Redesign so Penguin is still a Bird (layEggs) but only flying birds can fly. Show Bird, Flyable, Sparrow, Penguin.",
`class Bird {
    public void layEggs() { System.out.println("Bird is laying eggs"); }
}

interface Flyable {
    void fly();
}

class Sparrow extends Bird implements Flyable {
    @Override
    public void fly() { System.out.println("Sparrow can fly"); }
}

class Penguin extends Bird {
    // no fly() here, so it can safely replace a Bird
}`],

["LSP 2) Square extends Rectangle and breaks setWidth/setHeight behavior. Redesign without inheritance between them, using a common Shape abstraction with getArea().",
`interface Shape {
    int getArea();
}

class Rectangle implements Shape {
    private int width, height;

    public Rectangle(int width, int height) { this.width = width; this.height = height; }
    public void setWidth(int width)   { this.width = width; }
    public void setHeight(int height) { this.height = height; }

    @Override
    public int getArea() { return width * height; }
}

class Square implements Shape {
    private int side;

    public Square(int side) { this.side = side; }
    public void setSide(int side) { this.side = side; }

    @Override
    public int getArea() { return side * side; }
}`],

["LSP 3) ReadOnlyDocument extends Document but throws in print(). Redesign so every subtype can be used where its base type is expected.\n\nclass Document { void print() { } }\nclass ReadOnlyDocument extends Document { void print() { throw new UnsupportedOperationException(); } }",
`class Document {                                  // behavior every document has
    public void open() { System.out.println("Opening document"); }
}

interface Printable {
    void print();
}

class EditableDocument extends Document implements Printable {
    @Override
    public void print() { System.out.println("Printing document"); }
}

class ReadOnlyDocument extends Document {
    // read-only documents are not Printable, so there is nothing broken to call
}`],

["LSP 4) Vehicle has startEngine() but Bicycle extends Vehicle and throws. Fix it and show a main that moves both a Car and a Bicycle through Vehicle references.",
`class Vehicle {
    public void move() { System.out.println("Vehicle moves"); }
}

interface EnginePowered {
    void startEngine();
}

class Car extends Vehicle implements EnginePowered {
    @Override public void startEngine() { System.out.println("Car engine started"); }
}

class Bicycle extends Vehicle { }

public class Main {
    public static void main(String[] args) {
        Vehicle[] vs = { new Car(), new Bicycle() };
        for (Vehicle v : vs) v.move();               // both substitute Vehicle safely
    }
}`],

/* ---------- ISP ---------- */
["ISP 1) Worker has work() and eat(), but RobotWorker cannot eat. Split the interface and write HumanWorker (both) and RobotWorker (work only).",
`interface Workable { void work(); }
interface Eatable  { void eat(); }

class HumanWorker implements Workable, Eatable {
    public void work() { System.out.println("Human working"); }
    public void eat()  { System.out.println("Human eating"); }
}

class RobotWorker implements Workable {
    public void work() { System.out.println("Robot working"); }
}`],

["ISP 2) Printer has printDocument(), scanDocument(), faxDocument(). Split it so that SimplePrinter only prints and MultiFunctionPrinter does all three.",
`interface Printable { void printDocument(); }
interface Scannable { void scanDocument(); }
interface Faxable   { void faxDocument(); }

class SimplePrinter implements Printable {
    public void printDocument() { System.out.println("Printing"); }
}

class MultiFunctionPrinter implements Printable, Scannable, Faxable {
    public void printDocument() { System.out.println("Printing"); }
    public void scanDocument()  { System.out.println("Scanning"); }
    public void faxDocument()   { System.out.println("Faxing"); }
}`],

["ISP 3) interface Vehicle { void drive(); void fly(); } forces Car to implement fly(). Fix it with segregated interfaces and add a Plane that can do both.",
`interface Drivable { void drive(); }
interface Flyable  { void fly(); }

class Car implements Drivable {
    public void drive() { System.out.println("Car drives"); }
}

class Plane implements Drivable, Flyable {
    public void drive() { System.out.println("Plane taxis"); }
    public void fly()   { System.out.println("Plane flies"); }
}`],

/* ---------- DIP ---------- */
["DIP 1) DeliveryCompany creates a DeliveryDriver directly inside sendproduct(). Apply DIP with a DeliveryService interface and constructor injection. Add a second implementation DeliveryDrone and show main.",
`class Product {
    private String name;
    public Product(String name) { this.name = name; }
    public String getName() { return name; }
}

interface DeliveryService {
    void deliverproduct(Product product);
}

class DeliveryDriver implements DeliveryService {
    public void deliverproduct(Product product) {
        System.out.println("Driver delivers " + product.getName());
    }
}

class DeliveryDrone implements DeliveryService {
    public void deliverproduct(Product product) {
        System.out.println("Drone delivers " + product.getName());
    }
}

class DeliveryCompany {
    private DeliveryService DS;

    public DeliveryCompany(DeliveryService DS) { this.DS = DS; }

    public void sendproduct(Product product) { this.DS.deliverproduct(product); }
}

public class Main {
    public static void main(String[] args) {
        new DeliveryCompany(new DeliveryDriver()).sendproduct(new Product("Laptop"));
        new DeliveryCompany(new DeliveryDrone()).sendproduct(new Product("Phone"));
    }
}`],

["DIP 2) Computer creates its own Keyboard (keyboard = new Keyboard();). Apply DIP so Computer works with any input device.",
`interface InputDevice {
    void type();
}

class Keyboard implements InputDevice {
    public void type() { System.out.println("Typing on keyboard"); }
}

class VirtualKeyboard implements InputDevice {
    public void type() { System.out.println("Typing on screen"); }
}

class Computer {
    private InputDevice device;

    public Computer(InputDevice device) {        // injected abstraction
        this.device = device;
    }

    public void use() { device.type(); }
}`],

["DIP 3) Processor has 'private Logger logger = new Logger();'. Apply DIP using an ILogger interface and constructor injection, then write main.",
`interface ILogger {
    void log(String message);
}

class Logger implements ILogger {
    public void log(String message) { System.out.println("LOG: " + message); }
}

class Processor {
    private ILogger logger;

    public Processor(ILogger logger) { this.logger = logger; }

    public void process() { logger.log("Processing data"); }
}

public class Main {
    public static void main(String[] args) {
        Processor p = new Processor(new Logger());
        p.process();
    }
}`],

/* ---------- SINGLETON ---------- */
["Singleton 1) Write LetterSingleton as a LAZY Singleton: it holds a List of letters a-e, shuffles them in the private constructor, has getinstance(), and printdata(). In main, get two instances and print both hashCodes.",
`import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class LetterSingleton {
    private String[] letters = {"a", "b", "c", "d", "e"};
    private List<String> data = Arrays.asList(letters);

    private static LetterSingleton oneinstance;          // 1) private static reference

    public static LetterSingleton getinstance() {        // 2) public static getter
        if (oneinstance == null) {
            oneinstance = new LetterSingleton();
        }
        return oneinstance;
    }

    private LetterSingleton() {                          // 3) private constructor
        Collections.shuffle(data);
    }

    public void printdata() {
        for (String item : data) System.out.print(item + " ");
        System.out.println();
    }

    public static void main(String[] args) {
        LetterSingleton instance1 = LetterSingleton.getinstance();
        LetterSingleton instance2 = LetterSingleton.getinstance();
        instance1.printdata();
        instance2.printdata();                           // same order
        System.out.println(instance1.hashCode());
        System.out.println(instance2.hashCode());        // same hashCode
    }
}`],

["Singleton 2) Convert LetterSingleton into an EAGER Singleton. Show the class and how main gets two references.",
`public class LetterSingletonEager {
    private String[] letters = {"a", "b", "c", "d", "e"};
    private java.util.List<String> data = java.util.Arrays.asList(letters);

    // created immediately when the class is loaded
    public static LetterSingletonEager oneinstance = new LetterSingletonEager();

    private LetterSingletonEager() {
        java.util.Collections.shuffle(data);
    }

    public void printdata() {
        for (String item : data) System.out.print(item + " ");
        System.out.println();
    }

    public static void main(String[] args) {
        LetterSingletonEager i1 = LetterSingletonEager.oneinstance;
        LetterSingletonEager i2 = LetterSingletonEager.oneinstance;
        System.out.println(i1.hashCode() == i2.hashCode());   // true
    }
}`],

["Singleton 3) Write a lazy Singleton DatabaseConnection with a private constructor that prints 'Connecting...', a method executeQuery(String), and test in main that the constructor message appears only once even if getinstance() is called three times.",
`public class DatabaseConnection {
    private static DatabaseConnection oneinstance;

    private DatabaseConnection() {
        System.out.println("Connecting...");              // printed only once
    }

    public static DatabaseConnection getinstance() {
        if (oneinstance == null) {
            oneinstance = new DatabaseConnection();
        }
        return oneinstance;
    }

    public void executeQuery(String sql) {
        System.out.println("Executing: " + sql);
    }

    public static void main(String[] args) {
        DatabaseConnection a = DatabaseConnection.getinstance();
        DatabaseConnection b = DatabaseConnection.getinstance();
        DatabaseConnection c = DatabaseConnection.getinstance();
        a.executeQuery("SELECT 1");
        System.out.println(a == b && b == c);             // true
    }
}`],

["Singleton 4) Write a thread-safe LAZY Singleton called Config (field appName). Explain in a comment what problem synchronization solves.",
`public class Config {
    private static Config oneinstance;
    private String appName = "Exam Trainer";

    private Config() { }

    // synchronized: if two threads reach the null check at the same time,
    // only one of them can create the instance, so two objects can never exist.
    public static synchronized Config getinstance() {
        if (oneinstance == null) {
            oneinstance = new Config();
        }
        return oneinstance;
    }

    public String getAppName() { return appName; }
    public void setAppName(String appName) { this.appName = appName; }
}`],

["Singleton 5) Write a lazy Singleton IdGenerator that returns 1, 2, 3, ... on each call to nextId(). In main, get the instance twice from different variables and show the ids continue (1, 2, 3).",
`public class IdGenerator {
    private static IdGenerator oneinstance;
    private int current = 0;

    private IdGenerator() { }

    public static IdGenerator getinstance() {
        if (oneinstance == null) {
            oneinstance = new IdGenerator();
        }
        return oneinstance;
    }

    public int nextId() { return ++current; }

    public static void main(String[] args) {
        IdGenerator g1 = IdGenerator.getinstance();
        IdGenerator g2 = IdGenerator.getinstance();
        System.out.println(g1.nextId());   // 1
        System.out.println(g2.nextId());   // 2
        System.out.println(g1.nextId());   // 3
    }
}`],

/* ---------- FACTORY ---------- */
["Factory 1) Write the Enemy factory: abstract class Enemy (name, damage, health, showup()), Turtle (damage 5, health 50), Bird (damage 15, health 50), and EnemyFactory with constants TURTLE = 1, BIRD = 2 and createEnemy(int id) using a switch. Show main.",
`abstract class Enemy {
    private String name;
    private int damage;
    private int health;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getDamage() { return damage; }
    public void setDamage(int damage) { this.damage = damage; }
    public int getHealth() { return health; }
    public void setHealth(int health) { this.health = health; }

    public void showup() {
        System.out.println(name + " Is showing Up Damage is " + damage + " Health is " + health);
    }
}

class Turtle extends Enemy {
    public Turtle() { setName("Turtle"); setDamage(5); setHealth(50); }
}

class Bird extends Enemy {
    public Bird() { setName("Bird"); setDamage(15); setHealth(50); }
}

class EnemyFactory {
    public static final int TURTLE = 1;
    public static final int BIRD = 2;

    public static Enemy createEnemy(int id) {
        switch (id) {
            case TURTLE: return new Turtle();
            case BIRD:   return new Bird();
            default:     return null;
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Enemy e = EnemyFactory.createEnemy(EnemyFactory.TURTLE);
        if (e != null) e.showup();
        Enemy b = EnemyFactory.createEnemy(EnemyFactory.BIRD);
        if (b != null) b.showup();
    }
}`],

["Factory 2) Write the Sandwich factory: class SandWich (name, calories, prepare()), CheeseBurger (150 cal), ChickenBurger (200 cal), SandwichFactory with CHEESE_BURGER = 1, CHICKEN_BURGER = 2 and createsandwich(int sandwichID). Show main.",
`class SandWich {
    protected String name;
    protected int calories;

    public void prepare() {
        System.out.println("Preparing " + name + " (" + calories + " calories)");
    }
}

class CheeseBurger extends SandWich {
    public CheeseBurger() { name = "Cheese Burger"; calories = 150; }
}

class ChickenBurger extends SandWich {
    public ChickenBurger() { name = "Chicken Burger"; calories = 200; }
}

class SandwichFactory {
    public static final int CHEESE_BURGER = 1;
    public static final int CHICKEN_BURGER = 2;

    public static SandWich createsandwich(int sandwichID) {
        switch (sandwichID) {
            case CHEESE_BURGER:  return new CheeseBurger();
            case CHICKEN_BURGER: return new ChickenBurger();
            default:             return null;
        }
    }
}

public class Main {
    public static void main(String[] args) {
        SandWich s = SandwichFactory.createsandwich(SandwichFactory.CHEESE_BURGER);
        if (s != null) s.prepare();
    }
}`],

["Factory 3) Create a Factory for animals using an interface Animal with sound(). Write Dog and Cat, AnimalFactory.createAnimal(String type) and main that prints each sound.",
`interface Animal {
    void sound();
}

class Dog implements Animal {
    public void sound() { System.out.println("Bark"); }
}

class Cat implements Animal {
    public void sound() { System.out.println("Meow"); }
}

class AnimalFactory {
    public static Animal createAnimal(String type) {
        if (type.equalsIgnoreCase("Dog")) return new Dog();
        else if (type.equalsIgnoreCase("Cat")) return new Cat();
        return null;
    }
}

public class Main {
    public static void main(String[] args) {
        Animal a = AnimalFactory.createAnimal("Dog");
        if (a != null) a.sound();
        Animal b = AnimalFactory.createAnimal("Cat");
        if (b != null) b.sound();
    }
}`],

["Factory 4) Write a NotificationFactory. Notification is an interface with send(String). Create EmailNotification, SmsNotification and PushNotification. The factory takes a String type. Show main that sends 'Hello' through each type.",
`interface Notification {
    void send(String message);
}

class EmailNotification implements Notification {
    public void send(String m) { System.out.println("Email: " + m); }
}

class SmsNotification implements Notification {
    public void send(String m) { System.out.println("SMS: " + m); }
}

class PushNotification implements Notification {
    public void send(String m) { System.out.println("Push: " + m); }
}

class NotificationFactory {
    public static Notification create(String type) {
        switch (type.toLowerCase()) {
            case "email": return new EmailNotification();
            case "sms":   return new SmsNotification();
            case "push":  return new PushNotification();
            default:      return null;
        }
    }
}

public class Main {
    public static void main(String[] args) {
        String[] types = {"email", "sms", "push"};
        for (String t : types) {
            Notification n = NotificationFactory.create(t);
            if (n != null) n.send("Hello");
        }
    }
}`],

["Factory 5) Write a ReportFactory with abstract class Report (abstract generate()), PdfReport and ExcelReport, and a factory using int constants PDF = 1 and EXCEL = 2 that returns null for an unknown id. Show main handling the null case.",
`abstract class Report {
    public abstract void generate();
}

class PdfReport extends Report {
    @Override public void generate() { System.out.println("Generating PDF report"); }
}

class ExcelReport extends Report {
    @Override public void generate() { System.out.println("Generating Excel report"); }
}

class ReportFactory {
    public static final int PDF = 1;
    public static final int EXCEL = 2;

    public static Report createReport(int id) {
        switch (id) {
            case PDF:   return new PdfReport();
            case EXCEL: return new ExcelReport();
            default:    return null;
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Report r = ReportFactory.createReport(ReportFactory.PDF);
        if (r != null) r.generate();

        Report bad = ReportFactory.createReport(99);
        if (bad == null) System.out.println("Unknown report type");
    }
}`],

/* ---------- COMBINED ---------- */
["Combined 1) Write a Singleton EnemyFactory-style class: GameManager (lazy Singleton) that keeps a count of how many enemies were created, and creates them using an Enemy factory method createEnemy(String name). Show main creating 3 enemies from two different GameManager variables and printing the count (3).",
`abstract class Enemy {
    abstract String getName();
}
class Turtle extends Enemy { String getName() { return "Turtle"; } }
class Bird   extends Enemy { String getName() { return "Bird"; } }

class GameManager {
    private static GameManager oneinstance;
    private int created = 0;

    private GameManager() { }

    public static GameManager getinstance() {
        if (oneinstance == null) {
            oneinstance = new GameManager();
        }
        return oneinstance;
    }

    public Enemy createEnemy(String name) {          // factory method
        Enemy e;
        switch (name.toLowerCase()) {
            case "turtle": e = new Turtle(); break;
            case "bird":   e = new Bird();   break;
            default:       return null;
        }
        created++;
        return e;
    }

    public int getCreated() { return created; }
}

public class Main {
    public static void main(String[] args) {
        GameManager g1 = GameManager.getinstance();
        GameManager g2 = GameManager.getinstance();
        g1.createEnemy("turtle");
        g2.createEnemy("bird");
        g1.createEnemy("turtle");
        System.out.println(g2.getCreated());          // 3
    }
}`],

["Combined 2) Apply SRP + DIP: OrderService below creates a MySqlDb and also formats an email. Refactor: OrderRepository interface (save), MySqlOrderRepository, EmailFormatter (format), and OrderService that receives the repository through its constructor.\n\nclass OrderService {\n    MySqlDb db = new MySqlDb();\n    void place(String order) { db.save(order); System.out.println(\"Dear customer, order \" + order + \" placed\"); }\n}",
`interface OrderRepository {
    void save(String order);
}

class MySqlOrderRepository implements OrderRepository {
    public void save(String order) { System.out.println("MySQL saved " + order); }
}

class EmailFormatter {                                   // separate responsibility
    public String format(String order) {
        return "Dear customer, order " + order + " placed";
    }
}

class OrderService {
    private OrderRepository repo;                        // abstraction
    private EmailFormatter formatter;

    public OrderService(OrderRepository repo, EmailFormatter formatter) {
        this.repo = repo;
        this.formatter = formatter;
    }

    public void place(String order) {
        repo.save(order);
        System.out.println(formatter.format(order));
    }
}

public class Main {
    public static void main(String[] args) {
        new OrderService(new MySqlOrderRepository(), new EmailFormatter()).place("#42");
    }
}`]
  ]
});

