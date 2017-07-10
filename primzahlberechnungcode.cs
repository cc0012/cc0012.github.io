using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication3
{
    class Program
    {
        static void Main(string[] args)
        {
            // Benutzereingabe Unter- und Obergrenze
            int untergrenze;
            int obergrenze;
            bool IsPrime = true;

            // Benutzereingabe Untergrenze
            Console.WriteLine("Bitte geben Sie eine Untergrenze ein: ");
            untergrenze = Convert.ToInt32(Console.ReadLine());
            // Sicherstellen dass die eingegebene obgrenze grösser ist als ist die Untergrenze.
            do
            {
                Console.WriteLine("Bitte geben Sie eine Obergrenze ein: ");
                obergrenze = Convert.ToInt32(Console.ReadLine());
            }
            while (untergrenze > obergrenze);
            
            // "A Prime Number can be divided evenly only by 1, or itself. And it must be a whole number greater than 1."

            for (int i = untergrenze; i <= obergrenze; i++)
            {
                // Hier ist es sehr wichtig dass man bei j = 2 anfängt und nicht etwa bei j = untergrenze. Es geht hier dadrum dass man überprüfen will ob i, welches sehr wohl im angegebenen Interval sein soll, durch ein Zahl j (und die muss und kann ja kleiner sein als die vom Benutzer angegebene Untergrenze), ob also diese Division von i (untergrenze, obergrenze) durch j (2, obergrenze) ein Rest von Null hat. 1 lassen wir raus (wir fangen für die Werte von j bei 2 an) weil ja eine Regel einer Primzahl ist dass sie nur durch sich selbst oder 1 restlos teilbar ist.
                for (int j = 2; j < obergrenze; j++)
                {
                    if (i != j && i % j == 0)
                    {
                        IsPrime = false;
                        break;
                    }
                }
                if (IsPrime)
                {
                    // Wenn man die Zahlen nacheinander haben möchte dann benutzt man hier "\n"
                    Console.Write(i + "\t");
                }
                IsPrime = true;
            }
            // Without Readkey() the program doesn't display the results
            Console.ReadKey();


        }
    }
}
