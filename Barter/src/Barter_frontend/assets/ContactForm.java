
import java.util.Scanner;

public class ContactForm {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter First Name: ");
        String firstName = scanner.nextLine();

        System.out.print("Enter Last Name: ");
        String lastName = scanner.nextLine();

        System.out.print("Enter Email: ");
        String email = scanner.nextLine();

        System.out.print("Enter Your Message: ");
        String message = scanner.nextLine();

        if (validateForm(firstName, lastName, email, message)) {
            System.out.println("Form Submitted Successfully!");
        } else {
            System.out.println("Please fill out all required fields correctly.");
        }

        scanner.close();
    }

    public static boolean validateForm(String firstName, String lastName, String email, String message) {
        return !firstName.isEmpty() && !lastName.isEmpty() && email.contains("@") && !message.isEmpty();
    }
}
