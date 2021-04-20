$.jmpress("template", "step2", {
	x: 1000
});
$.jmpress("template", "step3", {
	x: 2000
	,children: [
		{ x: -250, y: 0, z: 1, scale: 0.3, exclude: true },
		{ x: 250, y: 150, z: 1, scale: 0.2 },
	]
});
$.jmpress("template", "exl", {
	exclude: true
});
$.jmpress("template", "step43", {
	x: -250,
	y: -200, // should not be applied
	z: 1, scale: 0.2
});
$.jmpress("template", "step43sec", {
	y: 150,
	exclude: false // should not be applied
});
$.jmpress("template", "step44", {
	x: 250, z: 1, scale: 0.2
});
$.jmpress("template", "step44sec", {
	y: 150, // should be applied
	scale: 1 // should not be applied
});
$.jmpress("template", "step4", {
	x: 3000
	,children: [
		{ x: -250, y: 0, z: 1, scale: 0.2, exclude: true },
		{ x: 250, y: 0, z: 1, scale: 0.2, template: "exl" },
		{ template: "step43" },
		{ template: "step44 step44sec" }
	]
});
$(function() {
	$('#simple').jmpress();
});