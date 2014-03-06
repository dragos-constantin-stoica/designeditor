(function($){
	var oldLoadDataMethod = $.fn.datagrid.methods.loadData;
	$.fn.datagrid.methods.loadData = function(jq, data){
		jq.each(function(){
			$.data(this, 'datagrid').filterSource = null;
		});
		return oldLoadDataMethod.call($.fn.datagrid.methods, jq, data);
	};
	
	$.extend($.fn.datagrid.defaults, {
		filterMenuIconCls: 'icon-ok',
		filterBtnIconCls: 'icon-filter',
		filterBtnPosition: 'right',
		filterPosition: 'bottom',
		remoteFilter: false,
		filterDelay: 400,
		filterRules: [],
		filterStringify: function(data){
			return JSON.stringify(data);
		}
	});
	
	// filter types
	$.fn.datagrid.defaults.filters = $.extend({}, $.fn.datagrid.defaults.editors, {
		label: {
			init: function(container, options){
				return $('<span></span>').appendTo(container);
			},
			getValue: function(target){
				return $(target).html();
			},
			setValue: function(target, value){
				$(target).html(value);
			},
			resize: function(target, width){
				$(target)._outerWidth(width)._outerHeight(22);
			}
		}
	});
	
	// filter operators
	$.fn.datagrid.defaults.operators = {
		nofilter: {
			text: 'No Filter'
		},
		contains: {
			text: 'Contains',
			isMatch: function(source, value){
				return source.toLowerCase().indexOf(value.toLowerCase()) >= 0;
			}
		},
		equal: {
			text: 'Equal',
			isMatch: function(source, value){
				return source == value;
			}
		},
		notequal: {
			text: 'Not Equal',
			isMatch: function(source, value){
				return source != value;
			}
		},
		beginwith: {
			text: 'Begin With',
			isMatch: function(source, value){
				return source.toLowerCase().indexOf(value.toLowerCase()) == 0;
			}
		},
		endwith: {
			text: 'End With',
			isMatch: function(source, value){
				return source.toLowerCase().indexOf(value.toLowerCase(), source.length - value.length) !== -1;
			}
		},
		less: {
			text: 'Less',
			isMatch: function(source, value){
				return source < value;
			}
		},
		lessorequal: {
			text: 'Less Or Equal',
			isMatch: function(source, value){
				return source <= value;
			}
		},
		greater: {
			text: 'Greater',
			isMatch: function(source, value){
				return source > value;
			}
		},
		greaterorequal: {
			text: 'Greater Or Equal',
			isMatch: function(source, value){
				return source >= value;
			}
		}
	};
	
	function resizeFilter(target, field, width){
		var dg = $(target);
		var header = dg.datagrid('getPanel').find('div.datagrid-header');
		var ff = field ? header.find('input.datagrid-filter[name="'+field+'"]') : header.find('input.datagrid-filter');
		ff.each(function(){
			var name = $(this).attr('name');
			var col = dg.datagrid('getColumnOption', name);
			var btn = $(this).closest('div.datagrid-filter-c').find('a.datagrid-filter-btn');
			if (width != undefined){
				this.filter.resize(this, width);
			} else {
				this.filter.resize(this, col.width - btn._outerWidth());
			}
		});
	}
	
	function getFilterComponent(target, field){
		var opts = $(target).datagrid('options');
		var header = $(target).datagrid('getPanel').find('div.datagrid-header');
		return header.find('tr.datagrid-filter-row td[field="'+field+'"] input.datagrid-filter');
	}
	
	/**
	 * get filter rule index, return -1 if not found.
	 */
	function getRuleIndex(target, field){
		var rules = $(target).datagrid('options').filterRules;
		for(var i=0; i<rules.length; i++){
			if (rules[i].field == field){
				return i;
			}
		}
		return -1;
	}
	
	function addFilterRule(target, param){
		var opts = $(target).datagrid('options');
		var rules = opts.filterRules;
		var index = getRuleIndex(target, param.field);
		if (index >= 0){
			if (param.op == 'nofilter'){
				removeFilterRule(target, param.field);
			} else {
				$.extend(rules[index], param);
			}
		} else {
			rules.push(param);
		}
		
		var input = getFilterComponent(target, param.field);
		if (input.length){
			if (param.op != 'nofilter'){
				input[0].filter.setValue(input, param.value);
			}
			var menu = input[0].menu;
			if (menu){
				menu.find('.'+opts.filterMenuIconCls).removeClass(opts.filterMenuIconCls);
				var item = menu.menu('findItem', opts.operators[param.op]['text']);
				menu.menu('setIcon', {
					target: item.target,
					iconCls: opts.filterMenuIconCls
				});
			}
		}
	}
	
	function removeFilterRule(target, field){
		var dg = $(target);
		var opts = dg.datagrid('options');
		if (field){
			var index = getRuleIndex(target, field);
			if (index >= 0){
				opts.filterRules.splice(index, 1);
			}
			_clear([field]);
		} else {
			opts.filterRules = [];
			var fields = dg.datagrid('getColumnFields',true).concat(dg.datagrid('getColumnFields'));
			_clear(fields);
		}
		
		function _clear(fields){
			for(var i=0; i<fields.length; i++){
				var input = getFilterComponent(target, fields[i]);
				if (input.length){
					input[0].filter.setValue(input, '');
					var menu = input[0].menu;
					if (menu){
						menu.find('.'+opts.filterMenuIconCls).removeClass(opts.filterMenuIconCls);
					}
				}
			}
		}
	}
	
	function doFilter(target){
		var state = $.data(target, 'datagrid');
		var opts = state.options;
		if (opts.remoteFilter){
			$(target).datagrid('load');
		} else {
			$(target).datagrid('getPager').pagination('refresh', {pageNumber:1});
			$(target).datagrid('options').pageNumber = 1;
			$(target).datagrid('loadData', state.filterSource || state.data);
		}
	}
	
	function myLoadFilter(data){
		var state = $.data(this, 'datagrid');
		var opts = state.options;
		
		if ($.isArray(data)){
			data = {
				total: data.length,
				rows: data
			};
		}
		if (!opts.remoteFilter){
			if (!state.filterSource){
				state.filterSource = data;
			}
			data = $.extend({}, state.filterSource);
			if (opts.filterRules.length){
				var rows = [];
				for(var i=0; i<data.rows.length; i++){
					var row = data.rows[i];
					if (isMatch(row)){
						rows.push(row);
					}
				}
				data = {
					total: data.total - (data.rows.length - rows.length),
					rows: rows
				};
			}
			if (opts.pagination){
				var dg = $(this);
				var pager = dg.datagrid('getPager');
				pager.pagination({
					onSelectPage:function(pageNum, pageSize){
	                    opts.pageNumber = pageNum;
	                    opts.pageSize = pageSize;
	                    pager.pagination('refresh',{
	                        pageNumber:pageNum,
	                        pageSize:pageSize
	                    });
	                    dg.datagrid('loadData', state.filterSource);
					}
				});
				var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
				var end = start + parseInt(opts.pageSize);
				data.rows = data.rows.slice(start, end);
			}
		}
		return data;
		
		function isMatch(row){
			var rules = opts.filterRules;
			for(var i=0; i<rules.length; i++){
				var rule = rules[i];
				var source = row[rule.field];
				if (source){
					var op = opts.operators[rule.op];
					if (!op.isMatch(source, rule.value)){return false}
				}
			}
			return true;
		}
	}
	
	function init(target, filters){
		filters = filters || [];
		var state = $.data(target, 'datagrid');
		var opts = state.options;
		
		var onResizeColumn = opts.onResizeColumn;
		opts.onResizeColumn = function(field,width){
			if (opts.fitColumns){
				resizeFilter(target, null, 10);
				$(target).datagrid('fitColumns');
				resizeFilter(target);
			} else {
				resizeFilter(target, field);
			}
			onResizeColumn.call(target, field, width);
		};
		var onResize = opts.onResize;
		opts.onResize = function(width,height){
			if (opts.fitColumns){
				resizeFilter(target, null, 10);
				$(target).datagrid('fitColumns');
				resizeFilter(target);
			}
			onResize.call(this, width, height);
		}
		var onBeforeLoad = opts.onBeforeLoad;
		opts.onBeforeLoad = function(param){
			param.filterRules = opts.filterStringify(opts.filterRules);
			return onBeforeLoad.call(this, param);
		};
		opts.loadFilter = myLoadFilter;
		
		initCss();
		createFilter(true);
		createFilter();		
		
		if (opts.fitColumns){
			setTimeout(function(){
				resizeFilter(target);
			}, 0);
		}
		
		function initCss(){
			if (!$('#datagrid-filter-style').length){
				$('head').append(
					'<style id="datagrid-filter-style">' +
					'a.datagrid-filter-btn{display:inline-block;width:22px;height:22px;vertical-align:top;cursor:pointer;opacity:0.6;filter:alpha(opacity=60);}' +
					'a:hover.datagrid-filter-btn{opacity:1;filter:alpha(opacity=100);}' +
					'</style>'
				);
			}
		}
		
		/**
		 * create filter component
		 */
		function createFilter(frozen){
			var dc = state.dc;
			var fields = $(target).datagrid('getColumnFields', frozen);
			if (frozen && opts.rownumbers){
				fields.unshift('_');
			}
			var table = (frozen?dc.header1:dc.header2).find('table.datagrid-htable');
			table.find('tr').each(function(){
				$(this).height($(this).height());
			});
			
			// clear the old filter component
			table.find('input.datagrid-filter').each(function(){
				if (this.filter.destroy){
					this.filter.destroy(this);
				}
				if (this.menu){
					$(this.menu).menu('destroy');
				}
			});
			table.find('tr.datagrid-filter-row').remove();
			
			var tr = $('<tr class="datagrid-header-row datagrid-filter-row"></tr>');
			if (opts.filterPosition == 'bottom'){
				tr.appendTo(table.find('tbody'));
			} else {
				tr.prependTo(table.find('tbody'));
			}
			
			for(var i=0; i<fields.length; i++){
				var field = fields[i];
				var col = $(target).datagrid('getColumnOption', field);
				if (col && (col.checkbox || col.expander)){
					field = '_';
				}
				var td = $('<td></td>').attr('field', field).appendTo(tr);
				if (field == '_'){continue;}
				var div = $('<div class="datagrid-filter-c"></div>').appendTo(td);
				
				var fopts = getFilter(field);
				var type = fopts ? fopts.type : 'text';
				
				var filter = opts.filters[fopts ? fopts.type : 'text'];
				var input = filter.init(div, fopts ? (fopts.options||{}) : {});
				input.addClass('datagrid-filter').attr('name', field);
				input[0].filter = filter;
				if(fopts === null) input[0].disabled = true;
				
				if (fopts){
					input[0].menu = createFilterButton(div, fopts.op);
					if (fopts.options && fopts.options.onInit){
						fopts.options.onInit.call(input[0]);
					}
				} else if (type == 'text'){
					input.bind('keydown', function(e){
						var t = $(this);
						if (this.timer){
							clearTimeout(this.timer);
						}
						if (e.keyCode == 13){
							addFilterRule(target, {
								field: t.attr('name'),
								op: 'contains',
								value: t.val()
							});
							doFilter(target);
						} else {
							this.timer = setTimeout(function(){
								addFilterRule(target, {
									field: t.attr('name'),
									op: 'contains',
									value: t.val()
								});
								doFilter(target);
							}, opts.filterDelay);
						}
					});
				}
				
				resizeFilter(target, field);
			}
		}
		
		function createFilterButton(container, operators){
			if (!operators){return null;}
			
			var btn = $('<a class="datagrid-filter-btn">&nbsp;</a>').addClass(opts.filterBtnIconCls);
			if (opts.filterBtnPosition == 'right'){
				btn.appendTo(container);
			} else {
				btn.prependTo(container);
			}
			var menu = $('<div></div>').appendTo('body');
			menu.menu({
				alignTo:btn,
				onClick:function(item){
					var btn = $(this).menu('options').alignTo;
					var td = btn.closest('td[field]');
					var field = td.attr('field');
					var input = td.find('input.datagrid-filter');
					var value = input[0].filter.getValue(input);
					
					addFilterRule(target, {
						field: field,
						op: item.name,
						value: value
					});
					
					doFilter(target);
				}
			});
			$.each(['nofilter'].concat(operators), function(index,item){
				var op = opts.operators[item];
				if (op){
					menu.menu('appendItem', {
						text: op.text,
						name: item
					});
				}
			});
			btn.bind('click', {menu:menu}, function(e){
				$(e.data.menu).menu('show');
				return false;
			});
			return menu;
		}
		
		function getFilter(field){
			for(var i=0; i<filters.length; i++){
				var filter = filters[i];
				if (filter.field == field){
					return filter;
				}
			}
			return null;
		}
	}
	
	$.extend($.fn.datagrid.methods, {
		enableFilter: function(jq, filters){
			return jq.each(function(){
				init(this, filters);
			});
		},
		addFilterRule: function(jq, param){
			return jq.each(function(){
				addFilterRule(this, param);
			});
		},
		removeFilterRule: function(jq, field){
			return jq.each(function(){
				removeFilterRule(this, field);
			});
		},
		doFilter: function(jq){
			return jq.each(function(){
				doFilter(this);
			});
		},
		getFilterComponent: function(jq, field){
			return getFilterComponent(jq[0], field);
		}
	});
})(jQuery);
