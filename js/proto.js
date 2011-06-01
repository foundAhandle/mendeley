/*
 * A diverging color scale, using previously-computed quantiles of population
 * densities; in the future, we might use a quantile scale here to do this
 * automatically. Map colors based on www.ColorBrewer.org, by Cynthia A. Brewer,
 * Penn State.
 */
var fill = pv.Scale.linear()
    .domain(140, 650, 1900)
    .range("#91bfdb", "#ffffbf", "#fc8d59");

/* Precompute the country's population density and color. */
countries.forEach(function(c) {
  c.color = stats[c.code].area
      ? fill(stats[c.code].pop / stats[c.code].area)
      : "#ccc"; // unknown
});

/*var w = 860,*/
var w = 430,
    h = 3 / 5 * w,
    geo = pv.Geo.scale("hammer").range(w, h);

var vis = new pv.Panel()
    .width(w)
    .height(h);

/* Countries. */
vis.add(pv.Panel)
    .data(countries)
  .add(pv.Panel)
    .data(function(c)c.borders)						 //curly braces will cause error
  .add(pv.Line)
    .data(function(b)b)								 //curly braces will cause error
    .left(geo.x)
    .top(geo.y)
    .title(function(d,b,c)c.name)					 //curly braces will cause error
    .fillStyle(function(d,b,c)c.color)				 //curly braces will cause error
    .strokeStyle(function()this.fillStyle().darker())//curly braces will cause error
    .lineWidth(1)
    .antialias(false);

/* Latitude ticks. 
vis.add(pv.Panel)
    .data(geo.ticks.lat())
  .add(pv.Line)
    .data(function(b) b)
    .left(geo.x)
    .top(geo.y)
    .strokeStyle("rgba(128,128,128,.3)")
    .lineWidth(1)
    .interpolate("cardinal")
    .antialias(false);
*/
/* Longitude ticks. 
vis.add(pv.Panel)
    .data(geo.ticks.lng())
  .add(pv.Line)
    .data(function(b) b)
    .left(geo.x)
    .top(geo.y)
    .strokeStyle("rgba(128,128,128,.3)")
    .lineWidth(1)
    .interpolate("cardinal")
    .antialias(false);
*/
vis.render();