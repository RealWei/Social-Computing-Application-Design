101062225 曾振瑋 Lab2-1

/////////////////////////////////////////
//                                     //
//    Functions contained in Lab 2-1   //
//                                     //
/////////////////////////////////////////

add :
    usage   : add x y z a b c d ...
    return  : value of x + y + z + a + b + c + d + ...
    example :
        input  : add 5 6 7 8 10
        output : 36.0

minus :
    usage   : minus x y z a b c d...
    return  : value of x - y - z - a - b - c - d - ...
    example :
        input  : minus 5 7 3 1
        output : -6.0

multiply :
    usage   : multiply x y z a b c...
    return  : value of x * y * z * a * b * c
    example :
        input  : multiply 4 7 2 3
        output : 168.0

divide :
    usage   : divide x y z a b c ...
    return  : value of x / y / z / a / b / c / ...
    example :
        input  : divide 5 7 17 3
                 divide 6 3 2
        output : 0.0140056022409
                 1.0

#prime :
    usage   : prime x (x will be cast to int.)
    return  : prime factorization of x
    example :
        input  : prime 24
                 prime 6.7
        output : 2 * 2 * 2 * 3
                 2 * 3

mod :
    usage   : mod x y
    return  : value of x % y
    example :
        input  : mod 5 3
                 mod 4.5 2
        output : 2.0
                 0.5

factorial :
    usage   : factorial x (x will be cast to int.)
    return  : value of x!
    example :
        input  : factorial 6
        output : 720

gcd :
    usage   : gcd x y (x y will be cast to int.)
    return  : greatest common divider of x and y.
    example :
        input  : gcd 8 16
                 gcd 17 3
        output : 8
                 1

exp :
    usage   : exp x
    return  : value of e^x
    example :
        input  : e^2
        output : 7.38905609893

log :
    usage   : log x (, y)
    return  : value of log_y(x). if y is not entered, it will return ln(x).
    example :
        input  : log 8 2
                 log 10
        output : 3.0
                 2.30258509299

pow :
    usage   : pow x y
    return  : value of x^y
    example :
        input  : pow 2 3
        output : 8.0

sqrt :
    usage   : sqrt x
    return  : the square root of x
    example :
        input  : sqrt 9
        output : 3

/////////////////////////////////////
//                                 //
//      Explanation of my work     //
//                                 //
/////////////////////////////////////

I modified echo_robot.py to complete the assignment.
When a message comes in, it will take message body and call split() method.
The first string is the calculation method that user wants. Following are numbers to be calculated.

Please see comments in calculate_robot.py for detailed implementation of calculation method mentioned above.


/////////////////////////////////////
//                                 //
//      Problems encountered       //
//                                 //
/////////////////////////////////////

1.
I don't know any easier implementation to convert a list of string to float numbers.
At first, I just call float(n) for each n in numbers then append it to a new list.
I noticed that map() function is useful in this case.

2.
The document of python 3.5 mentioned gcd() method in math module.
I tired to call it but failed, so I implemented one.

3.
def some_function(self, *args)
I thought that *args is a list but it turns out to be a tuple. So the input number list is actually args[0].
