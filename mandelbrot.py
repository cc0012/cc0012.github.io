max_count = 10
c = complex(2, 3)
z = 0

def mandelbrot(z, c):
	iteration = 0
	while iteration < max_count:
		z = z**2 + c
		iteration += 1
		print (z)

mandelbrot(z, c)
