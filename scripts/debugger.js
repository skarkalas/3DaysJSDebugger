//definition for Debugger
//============================================================
	
//constructor
function Debugger()
{
	//member variables
	//========================================================
	this.console = null;
	
	//initialisation function - executed only once
	(
		function()
		{
			if (typeof(console) !== "undefined")
			{
				this.console = console;
				return;
			}
		}
	)();

	//member methods
	//========================================================
	this.isFunctional = function()
	{
		return this.console !== null;
	}

	//handles errors
	this.error = function(error)
	{
		if(this.isFunctional() === false)
		{
			throw new Error('Debugger is not functional');
		}
		
		if(error instanceof Error === false)
		{
			throw new Error('error handler was called with a non-error parameter');
		}
		
		console.error("(Debugger) Error type: %s ==> Error message: %s", error.name, error.message);
	}

	//handles debug messages
	this.debug = function()
	{
		if(this.isFunctional() === false)
		{
			throw new Error('Debugger is not functional');
		}
		
		if(error instanceof Error === false)
		{
			throw new Error('error handler was called with a non-error parameter');
		}
		
		console.error("(Debugger) Error type: %s ==> Error message: %s", error.name, error.message);
	}
	
Debugger.message=function()
{
	if (typeof console!=="undefined")
	{
		for(var i=0;i<arguments.length;i++)
		{
			var argument=arguments[i];
			var specifier=Graphics.format(argument);
			
			if(specifier!==null)
			{
				console.info('(Graphics) '+specifier,argument);
			}
		}
	}
}
	
	
	
	
	
}

//non-member (static) methods
//============================================================

//accepts the list of arguments from another function, detects the type of arguments
//and enhances the list with the corresponding specifiers
Debugger.enhanceArguments = function(args)
{
	if(typeof args !== 'object')
	{
		return null;
	}
	
	if(typeof args.length === 'undefined')
	{
		return null;
	}

	var enhancedArgs = [];
	
	for(var arg in args)
	{
		var object = {};
		object.argument = args[arg];
		object.specifier = Debugger.format(argument);
		enhancedArgs.push(object);	
	}
	
	return enhancedArgs;
}

//accepts a piece of data and returns the format specifier that corresponds to its type
Debugger.format = function(data)
{
	//%s string, %d%i integer, %f float, %o dom object, %O POJO, %c css
	var type = typeof data;
	var specifier = null;

	//if there is no argument return null
	if(type === 'undefined')
	{
		return null;
	}
	
	if(type === 'number')
	{
		if(data % 1 === 0)
		{
			specifier = '%i';				//integer
		}
		else
		{
			specifier = '%f';				//real
		}
	}
	else if(type === 'string')
	{
		specifier = '%s';					//string
	}
	else if(type === 'object')
	{
		if(data instanceof HTMLElement)
		{
			specifier = '%o';				//dom
		}
		else
		{
			specifier = '%O';				//POJO
		}
	}
	
	return specifier;
}

//performs input validation for numeric values that have to be within the given range
Debugger.numberInRange = function(value, from, to)
{
	var valid = true;
	valid = valid && typeof value === 'number';
	valid = valid && typeof from === 'number';
	valid = valid && typeof to === 'number';	

	if(valid === false)
	{
		throw new TypeError('numberInRange: parameters must be numeric');
	}

	if(value < from || value > to)
	{
		throw new RangeError('numberInRange: values must be within the range ' + from + '-' + to);
	}
	
	return value;
}

//performs input validation for numeric values
Debugger.number = function(value)
{
	if(typeof value !== 'number')
	{
		throw new TypeError('invalid type: this value should be a number');
	}
	
	return value;
}

//performs input validation for text values
Debugger.string = function(value)
{
	if(typeof value !== 'string')
	{
		throw new TypeError('invalid type: this value should be a string');
	}
	
	return value;
}

//performs input validation for POJO reference values
Debugger.FUNCTIONreference = function(value)
{
	if(typeof value !== 'function')
	{
		throw new TypeError('invalid type: this value should be a Function');
	}
	
	return value;
}

//performs input validation for POJO reference values
Debugger.POJOreference = function(value)
{
	if(typeof value !== 'object')
	{
		throw new TypeError('invalid type: this value should be a POJO');
	}
	
	return value;
}

//performs input validation for DOM reference values
Debugger.HTMLreference = function(value)
{
	if(!(typeof value === 'object' && value instanceof HTMLElement))
	{
		throw new TypeError('invalid type: this value should be a DOM object');
	}
	
	return value;
}

//performs input validation for color values in rgb form
Debugger.color = function(red, green, blue)
{
	try
	{
		Debugger.number(red, 0, 255);
		Debugger.number(green, 0, 255);
		Debugger.number(blue, 0, 255);
	}
	catch(error)
	{
		Debugger.error(error);
		throw new TypeError('color: invalid parameters, rgb values nust be within the range 0-255');
	}

	return 'rgb(' + red + ',' + green + ',' + blue + ')';
}


/*
**	public methods
**	==============
**	background()
**	clear()
**	fill(r,g,b)
**	addGradientColor(red,green,blue,stop)
**	resetGradientColors()
**	fillGradient(x1,y2,[r1],x2,y2,[r2])
**	noFill()
**	stroke(r,g,b)
**	strokeWeight(size)
**	noStroke()
**	rect(x,y,width,height)
**	dot(x,y);
**	circle(centrex,centrey,radius)
**	ellipse(centrex,centrey,width,height)
**	triangle(x1,y1,x2,y2,x3,y3)
**	bezier(x1,y1,cx1,cy1,cx2,cy2,x2,y2)
**	line(x1,y1,x2,y2)
**	font(family,size,style)
**	text(text,x,y)
**	image(url,x,y)
**/


/*
	draw a line
	-----------
	graphics.stroke(50,60,80);
	graphics.line(20,20,50,60);

	draw a rectangle
	----------------
	graphics.fill(50,60,80);
	graphics.rect(20,20,50,60);

	draw some text
	--------------
	graphics.fill(50,60,80);
	graphics.font('times new roman',50,'italic');
	graphics.text('sokratis',20,30);
*/
