var AdParser = klass({

  initialize: function(dom, ad) {
    this.dom = dom;
    this.errors = [];
    if (ad == null || ad == undefined) {
      this.ad = new Advertisement();
    } else {
      this.ad = ad;
    }
  },

  parse: function() {
    // NOOP, implemented in child classes
    return this.ad;
  },

  getText: function(node) {
    if (typeof node.item == 'function') {
      node = node.item(0);
    }

    if (node == null || node.firstChild == null) {
      return null;
    }

    var text = "";
    _.each(node.childNodes, function(node) {
      text += node.data;
    });
    return Util.trim(text);
  },

  getElementByPath: function(dom, select) {
    var names = select.split("/");
    var result = dom;

    for (var i in names) {
      if (result == null || result.length == 0) {
        return null;
      }
      if (typeof result.item == 'function') {
        result = result.item(0);
      }

      result = result.getElementsByTagName(names[i]);
    }

    return result;
  }
});
