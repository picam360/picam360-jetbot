module.exports = {
	create_plugin : function(plugin_host) {
		console.log("create jetbot service plugin");
		var async = require('async');
		var fs = require("fs");
		var sprintf = require('sprintf-js').sprintf;

		var m_duty = 50;// %

		async
			.waterfall([
				function(callback) {
					callback(null);
				},
				function(callback) {
					callback(null);
				}], function(err, result) {
			});

		var plugin = {
			name : "jetbot_service",
			command_handler : function(cmd) {
				var split = cmd.split(' ');
				cmd = split[0].split('.')[1];
				switch (cmd) {
					case "forward" :
						break;
					case "backward" :
						break;
					case "turnleft" :
						break;
					case "turnright" :
						break;
				}
			}
		};
		return plugin;
	}
};