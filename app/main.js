function getTabIndex(item) {
	var tabs = tc.getChildren();
	var index = -1;
	for (var i = 0; i < tabs.length; i++) {
		var tab = tabs[i];
		if (item.id && item.pid) {
			var sign = tab.sign.split('|');
			var id = sign[1], pid = sign[0], title = tab.title;
			if (id === item.id && pid === item.pid && title === item.title) index = i;
		} else {
			if (tab.sign === item.sign && tab.title === item.title) index = i;
		}
	}
	return index;
}