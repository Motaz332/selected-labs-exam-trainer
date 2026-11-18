// Schema: mcq: [question, [options], correctIndex, explanation, optionalCode]
//         tf:  [statement, true/false, explanation]
//         essay: [question, modelAnswerCode]
const EXAMS = [];

/* ============================ EXAM 1: DOCTOR'S MIDTERM ============================ */
EXAMS.push({
  name: "Midterm (Doctor)",
  src: "Source: Selected Labs in SW Engineering - Midterm (solved) PDF",
  mcq: [
    ["Which concept is demonstrated when a subclass provides a specific implementation of a method already defined in its superclass?", ["Abstraction", "Inheritance", "Polymorphism", "Method Overriding"], 3, "Redefining a superclass method in the subclass = Method Overriding."],
    ["Which of the following is an example of violating the Liskov Substitution Principle?", ["Using inheritance to extend a class", "Creating an abstract class that is not implemented by any subclass", "Subclass modifying the behavior of a method so it cannot be used in place of its parent class", "Implementing an interface with an abstract class"], 2, "LSP is violated when the child cannot replace the parent without breaking expected behavior."],
    ["Which option best describes the Dependency Inversion Principle?", ["High-level modules should not depend on low-level modules. Both should depend on abstractions.", "Classes should be open for extension but closed for modification.", "Subtypes must be substitutable for their base types.", "One class should have only one reason to change."], 0, "B = OCP, C = LSP, D = SRP. DIP = depend on abstractions."],
    ["Which SOLID principle is primarily aimed at reducing the size of large interfaces?", ["Single Responsibility Principle", "Interface Segregation Principle", "Liskov Substitution Principle", "Dependency Inversion Principle"], 1, "ISP splits fat interfaces into small role-specific ones."],
    ["Which of the following is an example of violating the Open/Closed Principle?", ["Using inheritance to extend a class's functionality", "Modifying existing classes to add new features", "Implementing an interface to add new behaviors", "Using abstract classes for common functionality"], 1, "OCP = closed for modification. Editing existing classes for every new feature violates it."],
    ["Which statement about the Singleton pattern is true?", ["A Singleton class can have multiple instances if required", "A Singleton class uses a private constructor to restrict instantiation", "Singleton is used for creating multiple instances of a class", "The Singleton pattern cannot be used in multi-threaded applications"], 1, "Private constructor + static getInstance() are the core of Singleton."],
    ["What is the primary difference between an eager Singleton and a lazy Singleton?", ["Eager is initialized when required, Lazy at startup", "Lazy consumes more memory than Eager", "Lazy is instantiated when the class is loaded, Eager upon first request", "Eager is created at startup, Lazy is created upon the first request"], 3, "Eager = at startup/class load. Lazy = on first getInstance() call."],
    ["Which method is commonly used in the Singleton pattern to provide the instance of the class?", ["getObject()", "newInstance()", "getInstance()", "createObject()"], 2, "getInstance() is the standard name."],
    ["Which scenario is best suited for the Factory pattern?", ["A class needs to ensure a single instance", "A class needs to be extended", "A superclass has multiple subclasses and you need to return an object based on input", "You want to copy objects"], 2, "Factory = return the right subclass object based on an input (id/name)."],
    ["What does the Factory pattern provide over directly instantiating objects with new?", ["Reduces the number of classes", "Improves code readability", "Encapsulates object creation and increases flexibility", "Reduces memory usage"], 2, "The client no longer knows/creates the concrete classes."]
  ],
  tf: [
    ["Lazy initialization in Singleton is more memory efficient but may cause delays during object creation.", true, "The object is created only when needed, but the first request pays the creation cost."],
    ["Factory patterns eliminate the need to use inheritance between classes.", false, "Factory relies on a common superclass/interface for its products."],
    ["A Singleton class must have a static method that returns the single instance of the class.", true, "getInstance() must be static because no object can be created from outside."],
    ["Factory patterns help to reduce coupling between the client and the concrete classes.", true, "The client only talks to the factory and the abstract type."],
    ["The Singleton pattern is suitable for scenarios where global access to an instance is required.", true, "Singleton = one instance + global access point."],
    ["An abstract class can implement multiple interfaces in Java.", true, "A class (abstract or not) can implement many interfaces."],
    ["The Interface Segregation Principle aims to combine several interfaces into one larger interface.", false, "ISP does the opposite: split large interfaces."],
    ["The Single Responsibility Principle means a class should have more than one reason to change.", false, "SRP = exactly one reason to change."],
    ["Polymorphism allows the same method to behave differently based on the object it is acting upon.", true, "Same call, different behavior depending on the actual object."],
    ["Liskov Substitution Principle allows using child classes interchangeably with parent classes without altering expected behavior.", true, "That is the definition of LSP."]
  ],
  essay: [
    ["a) Design a Factory Pattern in Java to create different types of shapes (Circle, Square, Rectangle). Implement a Shape type with an abstract method draw, use a factory class to create the objects. In main, use the factory to create shape objects and draw them. (5 Marks)",
`abstract class Shape {
    abstract void draw();
}

class Circle extends Shape {
    @Override
    void draw() { System.out.println("Drawing a Circle."); }
}

class Square extends Shape {
    @Override
    void draw() { System.out.println("Drawing a Square."); }
}

class Rectangle extends Shape {
    @Override
    void draw() { System.out.println("Drawing a Rectangle."); }
}

class ShapeFactory {
    public static Shape getShape(String shapeType) {
        switch (shapeType.toLowerCase()) {
            case "circle":    return new Circle();
            case "square":    return new Square();
            case "rectangle": return new Rectangle();
            default:
                System.out.println("Invalid shape type!");
                return null;
        }
    }
}

public class FactoryPatternWithStaticMethod {
    public static void main(String[] args) {
        Shape circle = ShapeFactory.getShape("circle");
        if (circle != null) circle.draw();
        Shape square = ShapeFactory.getShape("square");
        if (square != null) square.draw();
        Shape rectangle = ShapeFactory.getShape("rectangle");
        if (rectangle != null) rectangle.draw();
    }
}`],
    ["b) Create a Counter class using the Singleton design pattern to count how many times the Singleton instance has been accessed. Implement the Counter class using the Lazy Singleton approach. Write the necessary code in main to test this class. (5 Marks)",
`class Counter {
    private static Counter instance;                 // private static reference (null at start)
    private static int getInstanceCallCount = 0;

    private Counter() { }                            // private constructor

    public static Counter getInstance() {
        getInstanceCallCount++;                      // count every access
        if (instance == null) {                      // lazy: create only on first request
            instance = new Counter();
        }
        return instance;
    }

    public int getInstanceCallCount() {
        return getInstanceCallCount;
    }
}

public class CounterSingletonTest {
    public static void main(String[] args) {
        Counter counter1 = Counter.getInstance();
        System.out.println("getInstance called: " + counter1.getInstanceCallCount() + " time(s)"); // 1
        Counter counter2 = Counter.getInstance();
        System.out.println("getInstance called: " + counter2.getInstanceCallCount() + " time(s)"); // 2
        Counter counter3 = Counter.getInstance();
        System.out.println("getInstance called: " + counter3.getInstanceCallCount() + " time(s)"); // 3
        System.out.println(counter1 == counter2 && counter2 == counter3);                          // true
    }
}`]
  ]
});

/* ============================ EXAM 2: QUIZ 1 (MOODLE) ============================ */
EXAMS.push({
  name: "Quiz 1 (Moodle)",
  src: "Source: Quiz-1 Version 2 (EELU Moodle) - answers from Eng. Marco's key",
  mcq: [
    ["Which OOP mechanism allows a subclass to provide its own implementation of a method defined in its parent class?", ["Method overloading", "Encapsulation", "Method overriding", "Composition"], 2, "Overriding."],
    ["Which type of polymorphism is achieved through method overriding?", ["Static polymorphism", "Data hiding", "Runtime polymorphism", "Compile-time polymorphism"], 2, "Overriding is resolved at runtime (dynamic dispatch)."],
    ["A class handles database access, report formatting, and email sending. Which SOLID principle is most clearly violated?", ["Interface Segregation", "Liskov Substitution", "Single Responsibility", "Open/Closed"], 2, "Three unrelated responsibilities = SRP."],
    ["A Square class inherits from Rectangle but breaks behavior when width and height are set independently. Which principle is violated?", ["Single Responsibility", "Liskov Substitution", "Open/Closed", "Interface Segregation"], 1, "Classic LSP violation."],
    ["You add a new payment type by creating a new class instead of modifying the existing checkout logic. Which principle does this follow?", ["Single Responsibility", "Open/Closed", "Interface Segregation", "Liskov Substitution"], 1, "Extension without modification = OCP."],
    ["A large interface forces implementing classes to define methods they never use. Which principle is violated?", ["Open/Closed", "Interface Segregation", "Liskov Substitution", "Single Responsibility"], 1, "Fat interface = ISP violation."],
    ["Which OOP relationship is described as an 'is-a' relationship?", ["Inheritance", "Overriding", "Composition", "Abstraction"], 0, "Inheritance = is-a. Composition = has-a."],
    ["Which practice best supports encapsulation?", ["Avoiding classes and using global variables", "Private fields with controlled access through methods", "Overriding every method", "Making all fields public"], 1, "Hide data (private) + expose via methods."],
    ["Which principle ensures a derived type can replace its base type without breaking correctness?", ["Interface Segregation", "Liskov Substitution", "Single Responsibility", "Open/Closed"], 1, "LSP."],
    ["Which design best follows the Interface Segregation Principle?", ["One large interface with all possible methods", "Small, role-specific interfaces based on client needs", "Public fields instead of interfaces", "A base class with every method declared"], 1, "Small role-specific interfaces."]
  ],
  tf: [
    ["A single class can be used to create multiple objects.", true, "A class is a blueprint; you can create many objects."],
    ["Abstraction and encapsulation mean exactly the same thing.", false, "Abstraction hides complexity (what); encapsulation hides data (how/protection)."],
    ["Method overloading is an example of runtime polymorphism.", false, "Overloading is compile-time (static) polymorphism."],
    ["The Single Responsibility Principle says a class should have only one reason to change.", true, "Definition of SRP."],
    ["The Open/Closed Principle requires modifying existing code for every new feature.", false, "OCP says extend, do not modify."],
    ["The Liskov Substitution Principle allows a subtype to break the contract of its base type.", false, "LSP forbids breaking the base contract."],
    ["The Interface Segregation Principle encourages large 'fat' interfaces.", false, "It discourages them."],
    ["Composition can reduce coupling compared with deep inheritance hierarchies.", true, "Favor composition over inheritance."],
    ["An interface can be used to define a contract that implementing classes must follow.", true, "Yes."],
    ["A non-abstract class implementing an interface must provide implementations for the interface's abstract methods.", true, "Otherwise it must be declared abstract."]
  ],
  essay: []
});

/* ============================ EXAM 3: MARCO MCQ - LEC 1 & 2 ============================ */
EXAMS.push({
  name: "Marco MCQ: OOP + SOLID",
  src: "Source: Eng. Marco Mourad MCQ bank - Lectures 1 and 2 (selected, with his answer key)",
  mcq: [
    ["A team adopts a reusable general approach that can be adapted to each application instead of copying one fixed code solution. What are they using?", ["A programming framework", "A design pattern", "A programming language", "A database schema"], 1, "Design pattern = general reusable solution approach, not copy-paste code."],
    ["Which preparation matches the prerequisites for studying design patterns?", ["Databases, networking, OS", "Only one procedural language", "Machine learning", "An OOP language, OOP fundamentals, and SOLID principles"], 3, "Stated in Lecture 1."],
    ["A class contains two methods named calculate with different parameter lists. Which concept is used?", ["Overriding", "Inheritance", "Polymorphism through superclass reference", "Method overloading"], 3, "Same name + different parameters in the same class = overloading."],
    ["A variable is declared with a superclass type but refers to a subclass object. Which concept is illustrated?", ["Composition", "Method overloading", "Encapsulation", "Polymorphism"], 3, "Employee E = new SalariedEmployee();"],
    ["A class must provide certain behavior but its implementation is left to implementing classes. Which construct matches?", ["A concrete object", "An interface", "A constructor", "A package"], 1, "Interface = contract."],
    ["A developer wants a meaningful textual representation of an employee instead of the default. What should they do?", ["Overload the constructor", "Make the class abstract", "Override toString()", "Convert the class to an interface"], 2, "Override toString()."],
    ["Employee superclass shares info, but earning formulas differ per type. Strongest reason to make earning() abstract?", ["Superclass must not contain attributes", "Subclasses must be prevented from inheriting", "Each employee subtype must provide its own earning calculation", "All use an identical formula"], 2, "Abstract method forces each subclass to define its own formula."],
    ["What is required for a subclass of an abstract Employee to be a concrete class?", ["Remove inherited attributes", "Declare itself an interface", "Use the same formula as every other subclass", "Implement the abstract earning method"], 3, "A concrete class must implement all inherited abstract methods."],
    ["A class does payroll calculation, report formatting and email sending. Which principle is violated?", ["Single Responsibility", "Open-Closed", "Liskov Substitution", "Dependency Inversion"], 0, "SRP."],
    ["A developer adds new behavior as an extension without changing existing, tested code. Which principle?", ["Interface Segregation", "Open-Closed", "Single Responsibility", "Liskov Substitution"], 1, "OCP."],
    ["ShapePrinter must be edited each time a new shape is introduced. What is the problem?", ["Too few methods", "Violates LSP because shapes cannot inherit", "Violates OCP because adding behavior requires modifying existing code", "Violates ISP"], 2, "Fix: abstract Shape with draw() + polymorphism."],
    ["Which concepts does the lecture identify as important for the OCP Shape solution?", ["Abstraction and polymorphism", "Encapsulation and constructors only", "Overloading and aggregation", "Eager and lazy initialization"], 0, "Abstract Shape + polymorphic draw()."],
    ["Could the abstract Shape in the OCP solution instead be an interface?", ["No, interfaces cannot define behavior", "No, shapes must be concrete", "Only if ShapePrinter is removed", "Yes"], 3, "Yes, an interface works too."],
    ["Replacing objects of type T with objects of subtype S changes desirable program behavior. Which principle is violated?", ["SRP", "Liskov Substitution", "OCP", "ISP"], 1, "LSP definition."],
    ["A Bird promises fly(), but Penguin (a Bird) cannot. What is the underlying issue?", ["Penguin has too many responsibilities", "Eager initialization", "The subtype cannot safely substitute the base type under the promised behavior", "Interface has too few methods"], 2, "LSP violation. Fix: Flyable interface only for birds that fly."],
    ["A class implementing Worker is forced to define eat() although a robot does not eat. Which principle is violated?", ["Open-Closed", "Dependency Inversion", "Liskov Substitution", "Interface Segregation"], 3, "Split into Workable and Eatable."],
    ["A high-level module depends on a concrete low-level class; the design is changed so both depend on an abstraction. Which principle?", ["Liskov", "Interface Segregation", "Dependency Inversion", "Single Responsibility"], 2, "DIP."],
    ["DeliveryCompany directly depends on concrete DeliveryDriver. Preferred direction?", ["DeliveryDriver inherits DeliveryCompany", "Company creates a new concrete driver each time", "Remove all relationships", "Use an abstraction (DeliveryService) rather than two concrete classes"], 3, "DeliveryCompany -> DeliveryService <- DeliveryDriver."],
    ["A class has one responsibility but depends directly on a specific concrete tool. Which statement is most accurate?", ["SRP automatically guarantees DIP", "The class must violate LSP", "Following SRP alone does not guarantee Dependency Inversion", "The class violates ISP"], 2, "The principles are independent."],
    ["A subtype throws an unsupported-operation error for a behavior the base class promises. Best matching principle?", ["SRP", "OCP", "DIP", "LSP"], 3, "LSP."]
  ],
  tf: [],
  essay: []
});

/* ============================ EXAM 4: MARCO MCQ - LEC 3 & 4 ============================ */
EXAMS.push({
  name: "Marco MCQ: Singleton + Factory",
  src: "Source: Eng. Marco Mourad MCQ bank - Lectures 3 and 4 (selected, with his answer key)",
  mcq: [
    ["A pattern that deals with creating objects belongs to which category?", ["Structural", "Behavioral", "Creational", "Procedural"], 2, "Singleton and Factory are Creational."],
    ["Which category covers communication between objects / behavior of objects?", ["Structural", "Creational", "Behavioral", "Relational"], 2, "Behavioral (Observer, Strategy...)."],
    ["The design requires one shared logger instance accessible globally. Which pattern?", ["Factory", "Observer", "Adapter", "Singleton"], 3, "Singleton."],
    ["Which constructor access level does Singleton use to prevent external creation?", ["Public", "Protected", "Private", "Package-only"], 2, "Private constructor."],
    ["A Singleton has a private constructor and private static reference. What else does the lazy approach use to give access?", ["A public instance field", "A public static getInstance() method", "A second public constructor", "An abstract factory subclass"], 1, "getInstance()."],
    ["getInstance() checks if the reference is null and creates the object only if none exists. Which approach?", ["Eager Singleton", "Structural Singleton", "Factory initialization", "Lazy Singleton"], 3, "Lazy."],
    ["A service is expensive to initialize and may never be needed. Which disadvantage of eager initialization is most relevant?", ["Each client must create its own instance", "Prevents global access", "May waste resources by creating an unused instance at startup", "Always creates multiple instances"], 2, "Eager creates at startup even if never used."],
    ["Singleton must be initialized only after configuration is fetched from a server. Which approach offers the flexibility?", ["Eager", "Lazy", "Public constructor", "Structural pattern"], 1, "Lazy: you decide when the first call happens."],
    ["Two threads call lazy getInstance() at the same time while the instance is null. What is the risk?", ["Constructor becomes public", "Class cannot be loaded", "Instance initialized too early", "Both threads may create separate instances"], 3, "Race condition."],
    ["What prevents concurrent threads from creating multiple lazy Singleton instances?", ["Synchronization", "Inheritance", "Method overloading", "Aggregation"], 0, "synchronized getInstance()."],
    ["Why does eager Singleton not need the same synchronization?", ["It creates a new instance per thread", "It uses a private constructor only", "The instance is created at class-loading time before threads access it", "It delays creation until threads request it"], 2, "Created once at class load."],
    ["Lazy initialization: exact creation time depends on the first request. Which drawback?", ["High coupling", "Unpredictable instantiation time", "No global access", "No static reference"], 1, "Unpredictable instantiation time."],
    ["Which statement distinguishes Singleton from Factory?", ["Singleton creates any product; Factory restricts to one object", "Both always create one object", "Factory is structural, Singleton behavioral", "Singleton restricts a class to one instance, while Factory creates requested product objects"], 3, "Different goals."],
    ["A costly service is always needed immediately at startup. Best choice?", ["Lazy Singleton", "Factory", "Eager Singleton", "Structural pattern"], 2, "Eager."],
    ["A client needs an object but should not know the concrete class. Which pattern?", ["Singleton", "Factory", "Observer", "Decorator"], 1, "Factory."],
    ["Several enemy classes share an abstract Enemy superclass; client sends the enemy name to a separate component. Its role?", ["Stores client data", "Superclass of every client", "Creates and returns the requested enemy object", "Prevents enemy subclasses"], 2, "EnemyFactory."],
    ["Moving construction logic from client code to a factory: main effect on the client?", ["Knows more concrete classes", "Responsible for all constructors", "Loses ability to request a product", "Less creation work and no concrete creation details"], 3, "Less coupling."],
    ["A factory hides the creation steps from the client. Which benefit?", ["Inheritance", "Encapsulation of the creation process", "Overloading", "Eager initialization"], 1, "Encapsulation of creation."],
    ["Why is a common superclass useful in the Factory example?", ["Shared parent type for related products", "Forces identical internal state", "Removes the need for a factory", "Makes client instantiate directly"], 0, "Factory returns the parent type."],
    ["Client constructs Enemy A, B, C directly. Which benefit of Factory is weakened?", ["Defining subclasses", "Common superclass", "Hiding creation and reducing client creation responsibility", "Passing an identifier"], 2, "Creation is back in the client."],
    ["Client sends a product name to a factory and receives an object. What does it avoid?", ["Using objects", "Knowing the concrete class and creation process", "Calling methods", "Depending on a common type"], 1, "Concrete class + creation process."],
    ["Which lecture example shows Factory is not limited to enemies?", ["Logger and database", "Bird and Penguin", "Sandwiches: Cheese and Chicken Burger", "Employee and Department"], 2, "SandwichFactory."]
  ],
  tf: [],
  essay: []
});

/* ============================ EXAM 5: SOLID PRACTICE (CODE READING) ============================ */
EXAMS.push({
  name: "SOLID Practice (code)",
  src: "Source: SOLID Practice Questions PDF (cleaned up, code-reading style)",
  mcq: [
    ["What is the output?", ["Bark / Meow / Some sound", "Some sound x3", "Meow / Bark / Some sound", "Bark / Some sound / Meow"], 0, "Runtime polymorphism: each object uses its own overridden sound().",
`class Animal { public String sound() { return "Some sound"; } }
class Dog extends Animal { public String sound() { return "Bark"; } }
class Cat extends Animal { public String sound() { return "Meow"; } }
// main:
Animal[] animals = { new Dog(), new Cat(), new Animal() };
for (Animal a : animals) System.out.println(a.sound());`],
    ["What is the output?", ["Child show", "Parent show", "Compilation error", "Runtime error"], 0, "The method is chosen by the actual object (Child).",
`class Parent { public void show() { System.out.println("Parent show"); } }
class Child extends Parent { public void show() { System.out.println("Child show"); } }
// main:
Parent p = new Child();
p.show();`],
    ["Which snippet best demonstrates encapsulation?", ["public double balance;", "double balance; + constructor", "protected double balance; + setBalance()", "private balance + getBalance(), deposit(), withdraw() with validation"], 3, "Private data + controlled access with validation."],
    ["Which option correctly follows ISP?", ["Printer should be an abstract class", "Already follows ISP", "SimplePrinter should only implement the methods it needs (so Printer must be split)", "Printer should be split into smaller interfaces"], 3, "The fix is splitting the interface: Printable, Scannable, Faxable.",
`interface Printer { void printDocument(); void scanDocument(); void faxDocument(); }
class SimplePrinter implements Printer { /* all three */ }`],
    ["Which refactoring fixes the SRP violation?", ["All methods in separate classes", "Move calculateTotalPrice elsewhere", "Move saveToDatabase and sendOrderConfirmation into separate classes", "Class is fine"], 2, "calculateTotalPrice is the Order's own job; persistence and notification are not.",
`class Order {
    public void calculateTotalPrice() { }
    public void saveToDatabase() { }
    public void sendOrderConfirmation() { }
}`],
    ["Which part violates OCP?", ["draw should use an abstract class", "The if-else per shape", "New shapes require modifying draw()", "b and c together describe the violation"], 3, "Each new shape means editing draw(). Fix: Shape interface + one class per shape.",
`public class Shape {
    public void draw(String shapeType) {
        if (shapeType.equals("Circle")) System.out.println("Drawing Circle");
        else if (shapeType.equals("Square")) System.out.println("Drawing Square");
    }
}`],
    ["Does this violate LSP?", ["Yes: Square violates the expected behavior of Rectangle", "No", "getArea must be overridden in Square", "Rectangle should be abstract"], 0, "Code expecting independent width/height breaks when given a Square.",
`class Rectangle { setWidth(int w){..} setHeight(int h){..} int getArea(){ return width*height; } }
class Square extends Rectangle {
    setWidth(int w)  { super.setWidth(w);  super.setHeight(w); }
    setHeight(int h) { super.setWidth(h);  super.setHeight(h); }
}`],
    ["Which snippet follows DIP?", ["Option 1 (Switch holds Light)", "Option 2 (Switch holds Switchable)", "Neither", "Both"], 1, "Option 2: Switch depends on an abstraction (Switchable), injected via constructor.",
`// Option 1
class Light { void turnOn(){..} }
class Switch { private Light light; Switch(Light l){..} void press(){ light.turnOn(); } }
// Option 2
interface Switchable { void turnOn(); }
class Light implements Switchable { .. }
class Switch { private Switchable device; Switch(Switchable d){..} void press(){ device.turnOn(); } }`],
    ["What change makes this adhere to LSP?", ["Remove Square", "Square must not override setWidth/setHeight", "Penguin: separate flying birds using a Flyable interface", "No change needed"], 2, "Bird should only contain behavior all birds have. Flying goes to Flyable.",
`class Bird { public void fly() { } }
class Penguin extends Bird {
    public void fly() { throw new UnsupportedOperationException("Penguins can't fly"); }
}`],
    ["Where is LSP violated?", ["CashPayment", "CreditCardPayment because of UnsupportedOperationException", "PaymentMethod should be abstract", "No violation"], 1, "A subtype that throws for a base-contract method cannot replace the base.",
`class PaymentMethod { void processPayment(double a){..} }
class CashPayment extends PaymentMethod { void processPayment(double a){ /*cash*/ } }
class CreditCardPayment extends PaymentMethod {
    void processPayment(double a){ throw new UnsupportedOperationException(); }
}`],
    ["How can ISP be applied here?", ["Keep as is", "Split Worker into Workable and Eatable", "RobotWorker should throw an exception", "HumanWorker should not implement Worker"], 1, "RobotWorker would then implement only Workable.",
`interface Worker { void work(); void eat(); }
class RobotWorker implements Worker {
    public void work() { }
    public void eat() { throw new UnsupportedOperationException("Robots do not eat"); }
}`],
    ["Which change gives DIP compliance?", ["Keep Computer as is", "Introduce a Keyboard interface and inject it via constructor", "Make Keyboard abstract only", "Add more dependencies"], 1, "Depend on an abstraction, not on 'new Keyboard()'.",
`class Keyboard { void type(){ } }
class Computer {
    private Keyboard keyboard;
    public Computer() { keyboard = new Keyboard(); }
}`],
    ["Best OCP refactor?", ["Add more else-if branches", "Use a PaymentMethod interface with one class per payment type", "Make processPayment final", "Keep everything in one class"], 1, "New payment = new class, no modification.",
`class PaymentProcessor {
    public void processPayment(String type) {
        if (type.equals("CreditCard")) { /* ... */ }
        else if (type.equals("PayPal")) { /* ... */ }
    }
}`],
    ["Which SRP issue(s) exist in Invoice?", ["calculateTotal should be separated", "printInvoice should move to a Printer class", "saveInvoiceToDatabase should move to InvoiceRepository", "b and c (calculateTotal is the Invoice's own job)"], 3, "The invoice should only calculate; printing and saving are other responsibilities.",
`class Invoice {
    public void calculateTotal() { }
    public void printInvoice() { }
    public void saveInvoiceToDatabase() { }
}`],
    ["How to uphold LSP?", ["Keep as is", "Use an interface to separate read-only behavior", "Make ReadOnlyDocument throw a different exception", "No change"], 1, "Printable behavior should not be promised to documents that cannot print.",
`class Document { public void print() { } }
class ReadOnlyDocument extends Document {
    public void print() { throw new UnsupportedOperationException(); }
}`],
    ["What is the correct ISP refactor?", ["Keep Vehicle", "Split into Drivable and Flyable", "Make Car abstract", "Add more vehicles"], 1, "Car implements only Drivable.",
`interface Vehicle { void drive(); void fly(); }
class Car implements Vehicle {
    public void drive() { }
    public void fly() { throw new UnsupportedOperationException("Car cannot fly"); }
}`]
  ],
  tf: [
    ["The SOLID principles are specific design patterns that dictate how to write code.", false, "They are design guidelines, not patterns."],
    ["High-level modules should depend on abstractions rather than concrete implementations.", true, "DIP."],
    ["Good software design aims to reduce coupling and increase cohesion.", true, "Yes."],
    ["The Interface Segregation Principle suggests that clients should be forced to implement methods they do not use.", false, "The opposite."],
    ["Polymorphism allows a method to have the same name but different implementations.", true, "Yes."],
    ["Overriding a method means a subclass redefines a superclass method.", true, "Yes."]
  ],
  essay: []
});
