/// <reference path="../../../ref.ts" />

class ArrayUtilsTest extends UnitTestClass {
	setUp() : void {

	}

	tearDown() : void {

	}

	ArrayUtilsSimpleTest() : void {
		// Arrange
		var a : Array<number>;
		var getter : Func<number, number>;

		a = [45, 3, 98, 2, 10];
		getter = x => x;
	
		// Act
		CollectionUtils.ArrayUtils.sort(a, getter);
	
		// Assert
		Assert.areEqual(2, a[0]);
		Assert.areEqual(3, a[1]);
		Assert.areEqual(10, a[2]);
		Assert.areEqual(45, a[3]);
		Assert.areEqual(98, a[4]);
	}

	ArrayUtilsDescendingTest() : void {
		// Arrange
		var a : Array<number>;
		var getter : Func<number, number>;

		a = [45, 3, 98, 2, 10];
		getter = x => x;
	
		// Act
		CollectionUtils.ArrayUtils.sort(a, getter, false);
	
		// Assert
		Assert.areEqual(98, a[0]);
		Assert.areEqual(45, a[1]);
		Assert.areEqual(10, a[2]);
		Assert.areEqual(3, a[3]);
		Assert.areEqual(2, a[4]);
	}

	ArrayUtilsGetterTest() : void {
		// Arrange
		var a : Array<Mocks.Person>;
		var getter : Func<Mocks.Person, number>;
		var p1 : Mocks.Person, p2 : Mocks.Person, p3 : Mocks.Person;

		getter = p => p.age;

		p1 = new Mocks.Person();
		p1.age = 34;
		p2 = new Mocks.Person();
		p2.age = 26;
		p3 = new Mocks.Person();
		p3.age = 58;

		a = [p1, p2, p3];
	
		// Act
		CollectionUtils.ArrayUtils.sort(a, getter);
	
		// Assert
		Assert.areEqual(p2, a[0]);
		Assert.areEqual(p1, a[1]);
		Assert.areEqual(p3, a[2]);
	}
}
