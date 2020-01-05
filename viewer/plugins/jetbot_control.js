var create_plugin = (function() {
	var m_plugin_host = null;
	var m_is_init = false;

	var SERVER_DOMAIN = UPSTREAM_DOMAIN;
	var CAPTURE_DOMAIN = SERVER_DOMAIN + UPSTREAM_DOMAIN;
	var VEHICLE_DOMAIN = SERVER_DOMAIN + "jetbot_service.";

	function init() {
	}
	return function(plugin_host) {
		m_plugin_host = plugin_host;
		if (!m_is_init) {
			m_is_init = true;
			init();
		}
		var menu_visible = false;
		var stereo_enabled = false;
		var plugin = {
			event_handler : function(sender, event) {
				if (sender == "ICADE") {
					switch (event) {
						case "A_BUTTON_UP" :
							break;
						case "B_BUTTON_UP" :
							event = "SWITCH_STEREO";
							break;
						case "G_BUTTON_UP" :
							event = "MENU_VISIBLE";
							break;
						case "LEFT_BUTTON_UP" :
						case "RIGHT_BUTTON_UP" :
						case "UP_BUTTON_UP" :
						case "DOWN_BUTTON_UP" :
							if (menu_visible) {
							} else {
								event = "STOP";
							}
							break;
						case "LEFT_BUTTON_DOWN" :
							if (menu_visible) {
								event = "DESELECT_ACTIVE_MENU";
							} else {
								event = "TURN_LEFT";
							}
							break;
						case "RIGHT_BUTTON_DOWN" :
							if (menu_visible) {
								event = "SELECT_ACTIVE_MENU";
							} else {
								event = "TURN_RIGHT";
							}
							break;
						case "UP_BUTTON_DOWN" :
							if (menu_visible) {
								event = "BACK2PREVIOUSE_MENU";
							} else {
								event = "MOVE_FORWARD";
							}
							break;
						case "DOWN_BUTTON_DOWN" :
							if (menu_visible) {
								event = "GO2NEXT_MENU";
							} else {
								event = "MOVE_BACKWARD";
							}
							break;
					}
				} else if (sender == "GAMEPAD") {
					console.log(event);
				}
				plugin.event_handler_act(event);
			},
			event_handler_act : function(event) {
				var params = event.split(" ");
				switch (params[0]) {
					case "MOVE_FORWARD" :
						var cmd = VEHICLE_DOMAIN + "move_forward";
						m_plugin_host.send_command(cmd);
						break;
					case "MOVE_BACKWARD" :
						var cmd = VEHICLE_DOMAIN + "move_backward";
						m_plugin_host.send_command(cmd);
						break;
					case "TURN_LEFT" :
						var cmd = VEHICLE_DOMAIN + "turn_left";
						m_plugin_host.send_command(cmd);
						break;
					case "TURN_RIGHT" :
						var cmd = VEHICLE_DOMAIN + "turn_right";
						m_plugin_host.send_command(cmd);
						break;
					case "STOP" :
						var cmd = VEHICLE_DOMAIN + "stop";
						m_plugin_host.send_command(cmd);
						break;
					case "SWITCH_STEREO" :
						m_plugin_host.send_command("set_stereo "
							+ (!stereo_enabled ? "1" : "0"));
						break;
					case "MENU_VISIBLE" :
						menu_visible = !menu_visible;
						m_plugin_host.set_menu_visible(menu_visible);
						break;
					case "SELECT_ACTIVE_MENU" :
						m_plugin_host.send_command(CAPTURE_DOMAIN
							+ "select_active_menu");
						break;
					case "DESELECT_ACTIVE_MENU" :
						m_plugin_host.send_command(CAPTURE_DOMAIN
							+ "deselect_active_menu");
						break;
					case "BACK2PREVIOUSE_MENU" :
						m_plugin_host.send_command(CAPTURE_DOMAIN
							+ "back2previouse_menu");
						break;
					case "GO2NEXT_MENU" :
						m_plugin_host.send_command(CAPTURE_DOMAIN
							+ "go2next_menu");
						break;
					case "STEREO_ENABLED" :
						stereo_enabled = true;
						break;
					case "STEREO_DISABLED" :
						stereo_enabled = false;
						break;
				}
			},
		};
		return plugin;
	}
})();