
describe('Weatherapp', function() {
  
  beforeEach(function() {
      //open the weather app to the chrome browser...
    browser.get('https://angulardemo-paula-cloud9.c9.io/');
  });
  
  it('Should fetch Helsinki current temperature from wundergroundAPI and add the weather data to the list', function() {
    // Verify that there are no items on the weather data list..
    expect(element.all(by.repeater('item in weatherArray')).count()).toEqual(0);

    //Select "Helsinki" from the city select options..
    element(by.cssContainingText('option', 'Helsinki, FI')).click();
  
    // Verify that the weather data is added to the weather data list..
    expect(element.all(by.repeater('item in weatherArray')).count()).toEqual(1);
  });

  it('Should should show and hide cler list link, if the weather data list is empty or not', function() {
    
    //expect one link to be hidden ('clear list'), if list is empty.
    var hiddenLinkCount = element.all(by.css('.ng-hide'));
    expect(hiddenLinkCount.count()).toEqual(1);

    //Select "Helsinki" from the city select options..
    element(by.cssContainingText('option', 'Helsinki, FI')).click();
  
    // Verify that the weather data is added to the weather data list..
    expect(element.all(by.repeater('item in weatherArray')).count()).toEqual(1);
    
    //expect that clear list link is now visible
    var hiddenLinkCount = element.all(by.css('.ng-hide'));
    expect(hiddenLinkCount.count()).toEqual(0);
    
  });

  it('Should clear the wether data list while the link is pressed', function() {

    //Add some data..
    element(by.cssContainingText('option', 'Helsinki, FI')).click();
  
    // Verify that the data was added to the list..
    expect(element.all(by.repeater('item in weatherArray')).count()).toEqual(1);
    
    //click the link
    element(by.css('.weather_app--clearList a')).click();
    
    // Verify that the data was cleared from the list..
    expect(element.all(by.repeater('item in weatherArray')).count()).toEqual(0);
    
  });
  
});