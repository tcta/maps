mapbox.ui.scale = function() {
    var scale = {}, map, element, maxwidth = 100;

    element = document.createElement('div');
    element.className = 'map-scale';

    var line_m = element.appendChild(document.createElement('div'));
    var label_m = element.appendChild(document.createElement('div'));
    var line_ft = element.appendChild(document.createElement('div'));
    var label_ft = element.appendChild(document.createElement('div'));
    line_m.className = 'map-scale-m-line';
    line_ft.className = 'map-scale-ft-line';

    function nicem(x) {
        if (x > 1000) {
            return Math.round(x / 1000) + 'km';
        } else {
            return Math.round(x) + 'm';
        }
    }

    function niceft(x) {
        if (x > 5280) {
            return Math.round(x / 5280) + 'mi';
        } else {
            return Math.round(x) + 'ft';
        }
    }

    function meters_to_feet(x) {
        return x * 3.28084;
    }

    function update(map) {
        var meters_per_pixel = (6378137 * Math.PI) /
            (256 * Math.pow(2, map.zoom() - 1));

        // be nice about the line
        label_m.innerHTML = nicem(meters_per_pixel * 100);
        label_ft.innerHTML = niceft(meters_to_feet(meters_per_pixel * 100));
        line_m.style.width = '100px';
        line_ft.style.width = '100px';
    }

    scale.map = function(x) {
        if (!arguments.length) return map;
        map = x;
        return scale;
    };

    scale.add = function() {
        if (!map) return scale;
        map.parent.appendChild(element);
        map.addCallback('zoomed', update);
        return scale;
    };

    scale.remove = function() {
        if (!map) return scale;
        element.parentNode.removeChild(element);
        map.removeCallback('zoomed', update);
        return scale;
    };

    return scale;
};
