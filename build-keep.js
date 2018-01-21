//// THIS FILE IS CONCATENATED WITH gulp-obfuscator-js
(function (native_require, this_module) {

    // Blatantly stolen from the fantastic node-obfuscator project by Stephen Mathieson
    //     https://github.com/stephenmathieson/node-obfuscator/blob/master/lib/require.js

    // based on TJ Holowaychuk's commonjs require binding

    function require(p, root) {
        // third-party module?  use native require
        if ('.' != p[0] && '/' != p[0]) {
            return native_require(p);
        }

        root = root || 'root';

        var path = require.resolve(p);

        // if it's a non-registered json file, it
        // must be at the root of the project
        if (!path && /\.json$/i.test(p)) {
            return native_require('./' + require.basename(p));
        }

        var module = require.cache[path];

        if (!module) {
            try {
                return native_require(p);
            } catch (err) {
                throw new Error('failed to require "' + p + '" from ' + root +'\n' +
                                                err.message + '\n' + err.stack);
            }
        }

        if (!module.exports) {
            module.exports = {};
            module.call(module.exports, module, module.exports,
                require.relative(path));
        }

        return module.exports;
    }

    // same as node's `require`
    require.cache = {};

    // node's native `path.basename`
    require.basename = native_require('path').basename;

    require.resolve = function (path) {
        // GH-12
        if ('.' != path[0]) {
            return native_require.resolve(path);
        }

        var pathWithSlash = path.slice(-1) === '/' ? path : path + '/';
        var paths = [
            path,
            path + '.js',
            pathWithSlash + 'index.js',
            path + '.json',
            pathWithSlash + 'index.json'
        ];

        for (var i in paths) {
            var p = paths[i];
            if (require.cache[p]) {
                return p;
            }
        }
    };

    require.register = function (path, fn) {
        require.cache[path] = fn;
    };

    require.relative = function (parent) {
        function relative(p) {
            if ('.' != p[0]) {
                return require(p);
            }

            var path = parent.split('/');
            var segs = p.split('/');
            path.pop();

            for (var i in segs) {
                var seg = segs[i];
                if ('..' == seg) {
                    path.pop();
                } else if ('.' != seg) {
                    path.push(seg);
                }
            }

            return require(path.join('/'), parent);
        }

        relative.resolve = require.resolve;
        relative.cache = require.cache;
        return relative;
    };

    //// BEGIN ORIGINAL SOURCE

    // BEGIN FILE ./main.js
    require.register("./main.js", function (module, exports, require) {

"use strict";module.exports={SECRET:"hiit-cityscan-secret-passphrase",MONGODB_URI:"mongodb://demo:demo@ds251737.mlab.com:51737/cityscan",PORT:process.env.PORT||5050,PORT_BROWSER_SYNC:3e3,PORT_NODEMON:8e3,CORS:{origin:"*",methods:"PUT, GET, POST, DELETE, OPTIONS",headers:"Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials",credentials:"true"}};
    });
    // END FILE

    // BEGIN FILE ./passport.js
    require.register("./passport.js", function (module, exports, require) {

"use strict";var passport=require("passport"),User=require("./user"),CONFIG=require("./main"),JwtStrategy=require("passport-jwt").Strategy,ExtractJwt=require("passport-jwt").ExtractJwt,LocalStrategy=require("passport-local"),localOptions={usernameField:"email"},localLogin=new LocalStrategy(localOptions,function(r,e,t){User.findOne({email:r},function(r,o){return r?t(r):o?void o.comparePassword(e,function(r,e){return r?t(r):e?t(null,o):t(null,!1,{error:"Your login details could not be verified. Please try again."})}):t(null,!1,{error:"Your login details could not be verified. Please try again."})})}),jwtOptions={jwtFromRequest:ExtractJwt.fromAuthHeader(),secretOrKey:CONFIG.SECRET},jwtLogin=new JwtStrategy(jwtOptions,function(r,e){User.findById(r._id,function(r,t){if(r)return e(r,!1);e(null,t||!1)})});passport.use(localLogin),passport.use(jwtLogin);
    });
    // END FILE

    // BEGIN FILE ./constants.js
    require.register("./constants.js", function (module, exports, require) {

"use strict";var ROLES={CLIENT:"CLIENT",ADMIN:"ADMIN"},PERMISSIONS={READ_USERS:"READ_USERS",WRITE_USERS:"WRITE_USERS"};module.exports={ROLES:ROLES,PERMISSIONS:PERMISSIONS};
    });
    // END FILE

    // BEGIN FILE ./permission.js
    require.register("./permission.js", function (module, exports, require) {

"use strict";var _mongoose=require("mongoose"),_mongoose2=_interopRequireDefault(_mongoose);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var Schema=_mongoose2.default.Schema,PermissionSchema=new Schema({label:{type:String,required:!0}});module.exports=_mongoose2.default.model("Permission",PermissionSchema);
    });
    // END FILE

    // BEGIN FILE ./role.js
    require.register("./role.js", function (module, exports, require) {

"use strict";var _mongoose=require("mongoose"),_mongoose2=_interopRequireDefault(_mongoose),_constants=require("./constants");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var Schema=_mongoose2.default.Schema,RoleSchema=new Schema({label:{type:String,enum:[_constants.ROLES.ADMIN,_constants.ROLES.CLIENT],required:!0},permissions:[{type:Schema.Types.ObjectId,ref:"Permission"}]});module.exports=_mongoose2.default.model("Role",RoleSchema);
    });
    // END FILE

    // BEGIN FILE ./user.js
    require.register("./user.js", function (module, exports, require) {

"use strict";var _bcryptNodejs=require("bcrypt-nodejs"),_bcryptNodejs2=_interopRequireDefault(_bcryptNodejs),_mongoose=require("mongoose"),_mongoose2=_interopRequireDefault(_mongoose);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var Schema=_mongoose2.default.Schema,UserSchema=new Schema({email:{type:String,lowercase:!0,unique:!0,required:!0},password:{type:String,required:!0},firstName:{type:String},lastName:{type:String},role:{type:Schema.Types.ObjectId,ref:"Role"},resetPasswordToken:{type:String},resetPasswordExpires:{type:Date}},{timestamps:!0});UserSchema.pre("save",function(e){var r=this;if(!r.isModified("password"))return e();_bcryptNodejs2.default.genSalt(5,function(t,o){if(t)return e(t);_bcryptNodejs2.default.hash(r.password,o,null,function(t,o){if(t)return e(t);r.password=o,e()})})}),UserSchema.methods.comparePassword=function(e,r){_bcryptNodejs2.default.compare(e,this.password,function(e,t){if(e)return r(e);r(null,t)})},module.exports=_mongoose2.default.model("User",UserSchema);
    });
    // END FILE

    // BEGIN FILE ./util.service.js
    require.register("./util.service.js", function (module, exports, require) {

"use strict";var setUserInfo=function(e){return{_id:e._id,updatedAt:e.updatedAt,createdAt:e.createdAt,firstName:e.firstName,lastName:e.lastName,email:e.email,role:e.role}};module.exports={setUserInfo:setUserInfo};
    });
    // END FILE

    // BEGIN FILE ./auth.controller.js
    require.register("./auth.controller.js", function (module, exports, require) {

"use strict";var _jsonwebtoken=require("jsonwebtoken"),_jsonwebtoken2=_interopRequireDefault(_jsonwebtoken),_user=require("./user"),_user2=_interopRequireDefault(_user),_main=require("./main"),_main2=_interopRequireDefault(_main),_util=require("./util.service"),_lodash=require("lodash");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function generateToken(e){return _jsonwebtoken2.default.sign(e,_main2.default.SECRET,{expiresIn:3600})}require("crypto");var populateRoleAndPermissions={path:"role",populate:{path:"permissions"}},authController=function(){return{login:function(e,r,t){e.user.populate({path:"role",populate:{path:"permissions"}},function(n){if(n)return t(n);var o=(0,_util.setUserInfo)(e.user);r.status(200).json({token:"JWT  "+generateToken(o),user:o}),t()})},hasAuthorization:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return e=[].concat([],e),r=[].concat([],r),function(t,n,o){var s=t.user;_user2.default.findById(s._id).populate("role").exec(function(t,s){if(t)return n.status(422).json({error:"No user found."}),o(t);var u=s.role.permissions.map(function(e){return e.label});return e.indexOf(s.role.label)>-1||(0,_lodash.intersection)(r,u).length>0?o():(n.status(401).json({error:"You are not authorized to view this content"}),o("Unauthorized"))})}},register:function(e,r,t){var n=e.body.email,o=e.body.firstName,s=e.body.lastName,u=e.body.password,a=e.body.role;return n?o&&s?u?void _user2.default.findOne({email:n},function(e,i){return e?t(e):i?r.status(422).send({error:"That email address is already in use."}):void new _user2.default({email:n,password:u,firstName:o,lastName:s,role:a}).save(function(e,n){if(e)return t(e);n.populate(populateRoleAndPermissions,function(e){if(e)return t(e);var o=(0,_util.setUserInfo)(n);r.status(201).json({token:"JWT  "+generateToken(o),user:o})})})}):r.status(422).send({error:"You must enter a password."}):r.status(422).send({error:"You must enter your full name."}):r.status(422).send({error:"You must enter an email address."})}}};module.exports=authController;
    });
    // END FILE

    // BEGIN FILE ./permission.controller.js
    require.register("./permission.controller.js", function (module, exports, require) {

"use strict";var _permission2=require("./permission"),_permission3=_interopRequireDefault(_permission2);function _interopRequireDefault(s){return s&&s.__esModule?s:{default:s}}var permissionController=function(){return{add:function(s,e,n){var i=s.body.label;if(!i)return e.status(422).send({error:"You must enter a permission label."});_permission3.default.findOne({label:i},function(s,o){s?e.status(500).send(s):o?e.status(422).json({error:"This permission already exists."}):new _permission3.default({label:i}).save(function(s,i){if(s)return n(s);e.status(201).json(i)})})},edit:function(s,e){s.permission.label=s.body.label,s.permission.save(function(s,n){s?e.status(500).send(s):e.json(n)})},find:function(s,e){e.json(s.permission)},findAll:function(s,e){_permission3.default.find({},function(s,n){s?e.status(500).send(s):e.json(n)})},middleware:function(s,e,n){_permission3.default.findById(s.params.id,function(i,o){i?e.status(500).send(i):o?(s.permission=o,n()):e.status(404).send("No permission found")})},remove:function(s,e){s.permission.remove(function(s){s?e.status(500).send(s):e.status(204).send("Successfully removed")})}}};module.exports=permissionController;
    });
    // END FILE

    // BEGIN FILE ./role.controller.js
    require.register("./role.controller.js", function (module, exports, require) {

"use strict";var _role2=require("./role"),_role3=_interopRequireDefault(_role2);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var roleController=function(){return{add:function(e,o,s){var n=e.body.label,r=e.body.permissions?e.body.permissions:[];if(!n)return o.status(422).send({error:"You must enter a role label."});_role3.default.findOne({label:n},function(e,t){if(e)o.status(500).send(e);else if(t)o.status(422).json({error:"This role already exists."});else{var l=new _role3.default({label:n,permissions:r});l.save(function(e){if(e)return s(e);l.populate("permissions",function(e,s){o.status(201).json(s)})})}})},edit:function(e,o){e.role.label=e.body.label,e.role.permissions=e.body.permissions,e.role.save(function(e,s){e?o.status(500).send(e):o.json(s)})},find:function(e,o){o.json(e.role)},findAll:function(e,o){_role3.default.find({}).populate("permissions").exec(function(e,s){e?o.status(500).send(e):o.json(s)})},middleware:function(e,o,s){_role3.default.findById(e.params.id).populate("permissions").exec(function(n,r){n?o.status(500).send(n):r?(e.role=r,s()):o.status(404).send("No role found")})},remove:function(e,o){e.role.remove(function(e){e?o.status(500).send(e):o.status(204).send("Successfully removed")})}}};module.exports=roleController;
    });
    // END FILE

    // BEGIN FILE ./user.controller.js
    require.register("./user.controller.js", function (module, exports, require) {

"use strict";var _user=require("./user"),_user2=_interopRequireDefault(_user),_util=require("./util.service"),_nightmare=require("nightmare"),_nightmare2=_interopRequireDefault(_nightmare),_jquery=require("jquery"),_jquery2=_interopRequireDefault(_jquery);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var nightmare=new _nightmare2.default({show:!0}),populateRoleAndPermissions={path:"role",populate:{path:"permissions"}},userController=function(){return{add:function(e,t,n){},edit:function(e,t){e.user.set(e.body),e.user.save(function(e,n){e?t.status(500).send(e):n.populate(populateRoleAndPermissions,function(e){e?t.status(500).send(e):t.json((0,_util.setUserInfo)(n))})})},find:function(e,t){t.json((0,_util.setUserInfo)(e.user))},findAll:function(e,t){_user2.default.find({}).populate(populateRoleAndPermissions).exec(function(e,n){if(e)t.status(500).send(e);else{var u=n.map(function(e){return(0,_util.setUserInfo)(e)});t.json(u)}})},middleware:function(e,t,n){_user2.default.findById(e.params.id).populate(populateRoleAndPermissions).exec(function(u,r){u?t.status(500).send(u):r?(e.user=r,n()):t.status(404).send("No role found")})},remove:function(e,t){e.user.remove(function(e){e?t.status(500).send(e):t.status(204).send("Successfully removed")})},scan:function(){nightmare.goto("http://www.seloger.com/").wait(2e3).type('.jsInlineContainer input[type="text"]',"paris").wait(1e3).evaluate(function(){(0,_jquery2.default)('.jsInlineContainer input[type="text"]').focus(),(0,_jquery2.default)(".selectize-dropdown")[0].style.display="block"}).wait(3e3).evaluate(function(){(0,_jquery2.default)(".optionContainer").get(0).click()}).wait(1e3).click(".b-btn.b-warn").wait(3e3).evaluate(function(){return Array.from((0,_jquery2.default)(".c-pa-list")).map(function(e){var t={};return t.price=(0,_jquery2.default)(e).find(".c-pa-price").text(),t})}).end().then(function(e){e.forEach(function(e){})}).catch(function(e){})}}};module.exports=userController;
    });
    // END FILE

    // BEGIN FILE ./user.controller.spec.js
    require.register("./user.controller.spec.js", function (module, exports, require) {

"use strict";var sinon=require("sinon");describe("Book Controller Tests",function(){describe("Post",function(){it("should not allow an empty title on post",function(){var s={status:sinon.spy(),send:sinon.spy()};require("./bookController")(function(){(void 0).save=function(){}}).post({body:{author:"Youness"}},s),s.status.calledWith(400).should.equal(!0,"Bad Status "+s.status.args[0][0]),s.send.calledWith("Title is required").should.equal(!0)})})});
    });
    // END FILE

    // BEGIN FILE ./auth.router.js
    require.register("./auth.router.js", function (module, exports, require) {

"use strict";var _express=require("express"),_express2=_interopRequireDefault(_express),_passport=require("passport"),_passport2=_interopRequireDefault(_passport);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}require("./passport");var authController=require("./auth.controller")(),requireLogin=_passport2.default.authenticate("local",{session:!1});module.exports=function(){var e=new _express2.default.Router;return e.post("/register",authController.register),e.post("/login",requireLogin,authController.login),e};
    });
    // END FILE

    // BEGIN FILE ./permission.router.js
    require.register("./permission.router.js", function (module, exports, require) {

"use strict";var _constants=require("./constants"),_express=require("express"),_express2=_interopRequireDefault(_express),_passport=require("passport"),_passport2=_interopRequireDefault(_passport);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}require("./passport");var permissionController=require("./permission.controller")(),authController=require("./auth.controller")(),requireAuth=_passport2.default.authenticate("jwt",{session:!1});module.exports=function(){var e=new _express2.default.Router;return e.use(requireAuth,authController.hasAuthorization(_constants.ROLES.ADMIN)),e.post("/",permissionController.add),e.get("/",permissionController.findAll),e.use("/:id",permissionController.middleware),e.get("/:id",permissionController.find),e.put("/:id",permissionController.edit),e.delete("/:id",permissionController.remove),e};
    });
    // END FILE

    // BEGIN FILE ./role.router.js
    require.register("./role.router.js", function (module, exports, require) {

"use strict";var _constants=require("./constants"),_express=require("express"),_express2=_interopRequireDefault(_express),_passport=require("passport"),_passport2=_interopRequireDefault(_passport);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}require("./passport");var roleController=require("./role.controller")(),authController=require("./auth.controller")(),requireAuth=_passport2.default.authenticate("jwt",{session:!1});module.exports=function(){var e=new _express2.default.Router;return e.use(requireAuth,authController.hasAuthorization(_constants.ROLES.ADMIN,_constants.PERMISSIONS.READ_USERS)),e.post("/",roleController.add),e.get("/",roleController.findAll),e.use("/:id",roleController.middleware),e.get("/:id",roleController.find),e.put("/:id",roleController.edit),e.delete("/:id",roleController.remove),e};
    });
    // END FILE

    // BEGIN FILE ./user.router.js
    require.register("./user.router.js", function (module, exports, require) {

"use strict";var _express=require("express"),_express2=_interopRequireDefault(_express),_passport=require("passport"),_passport2=_interopRequireDefault(_passport),_constants=require("./constants");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}require("./passport");var userController=require("./user.controller")(),authController=require("./auth.controller")(),requireAuth=_passport2.default.authenticate("jwt",{session:!1});module.exports=function(){var e=new _express2.default.Router;return e.use(requireAuth,authController.hasAuthorization(_constants.ROLES.ADMIN)),e.get("/",userController.findAll),e.get("/",userController.scan),e.use("/:id",userController.middleware),e.get("/:id",userController.find),e.put("/:id",userController.edit),e.delete("/:id",userController.remove),e};
    });
    // END FILE

    // BEGIN FILE ./app.js
    require.register("./app.js", function (module, exports, require) {

"use strict";var _express=require("express"),_express2=_interopRequireDefault(_express);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var compression=require("compression"),app=(0,_express2.default)(),bodyParser=require("body-parser"),logger=require("morgan"),mongoose=require("mongoose"),CONFIG=require("./main"),authRouter=require("./auth.router")(),userRouter=require("./user.router")(),roleRouter=require("./role.router")(),permissionRouter=require("./permission.router")();mongoose.connect(CONFIG.MONGODB_URI),"test"===process.env.ENV||(mongoose.connect(process.env.MONGODB_URI||CONFIG.MONGODB_URI),app.listen(process.env.PORT||CONFIG.PORT)),app.use(bodyParser.urlencoded({extended:!1})),app.use(bodyParser.json()),app.use(logger("dev")),app.use(compression()),app.use(function(e,r,s){r.header("Access-Control-Allow-Origin",CONFIG.CORS.origin),r.header("Access-Control-Allow-Methods",CONFIG.CORS.methods),r.header("Access-Control-Allow-Headers",CONFIG.CORS.headers),r.header("Access-Control-Allow-Credentials",CONFIG.CORS.credentials),s()});var apiRoutes=new _express2.default.Router;app.use("/api",apiRoutes),apiRoutes.use("/auth",authRouter),apiRoutes.use("/user",userRouter),apiRoutes.use("/role",roleRouter),apiRoutes.use("/permission",permissionRouter),app.use(_express2.default.static("public"));
    });
    // END FILE

    //// END OF ORIGINAL SOURCE
    this_module.exports = require("./app.js");
} (require, module));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vb2JmdXNjYXRvci9iZWdpbm5pbmcuanMiLCJtYWluLmpzIiwicGFzc3BvcnQuanMiLCJjb25zdGFudHMuanMiLCJwZXJtaXNzaW9uLmpzIiwicm9sZS5qcyIsInVzZXIuanMiLCJ1dGlsLnNlcnZpY2UuanMiLCJhdXRoLmNvbnRyb2xsZXIuanMiLCJwZXJtaXNzaW9uLmNvbnRyb2xsZXIuanMiLCJyb2xlLmNvbnRyb2xsZXIuanMiLCJ1c2VyLmNvbnRyb2xsZXIuanMiLCJ1c2VyLmNvbnRyb2xsZXIuc3BlYy5qcyIsImF1dGgucm91dGVyLmpzIiwicGVybWlzc2lvbi5yb3V0ZXIuanMiLCJyb2xlLnJvdXRlci5qcyIsInVzZXIucm91dGVyLmpzIiwiYXBwLmpzIiwiLi9vYmZ1c2NhdG9yL2VuZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3pHQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7O0FDQUE7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVpbGQuanMiLCJzb3VyY2VzQ29udGVudCI6W251bGwsIlwidXNlIHN0cmljdFwiO21vZHVsZS5leHBvcnRzPXtTRUNSRVQ6XCJoaWl0LWNpdHlzY2FuLXNlY3JldC1wYXNzcGhyYXNlXCIsTU9OR09EQl9VUkk6XCJtb25nb2RiOi8vZGVtbzpkZW1vQGRzMjUxNzM3Lm1sYWIuY29tOjUxNzM3L2NpdHlzY2FuXCIsUE9SVDpwcm9jZXNzLmVudi5QT1JUfHw1MDUwLFBPUlRfQlJPV1NFUl9TWU5DOjNlMyxQT1JUX05PREVNT046OGUzLENPUlM6e29yaWdpbjpcIipcIixtZXRob2RzOlwiUFVULCBHRVQsIFBPU1QsIERFTEVURSwgT1BUSU9OU1wiLGhlYWRlcnM6XCJPcmlnaW4sIFgtUmVxdWVzdGVkLVdpdGgsIENvbnRlbnQtVHlwZSwgQWNjZXB0LCBBdXRob3JpemF0aW9uLCBBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFsc1wiLGNyZWRlbnRpYWxzOlwidHJ1ZVwifX07IiwiXCJ1c2Ugc3RyaWN0XCI7dmFyIHBhc3Nwb3J0PXJlcXVpcmUoXCJwYXNzcG9ydFwiKSxVc2VyPXJlcXVpcmUoXCIuLi9tb2RlbHMvdXNlclwiKSxDT05GSUc9cmVxdWlyZShcIi4vbWFpblwiKSxKd3RTdHJhdGVneT1yZXF1aXJlKFwicGFzc3BvcnQtand0XCIpLlN0cmF0ZWd5LEV4dHJhY3RKd3Q9cmVxdWlyZShcInBhc3Nwb3J0LWp3dFwiKS5FeHRyYWN0Snd0LExvY2FsU3RyYXRlZ3k9cmVxdWlyZShcInBhc3Nwb3J0LWxvY2FsXCIpLGxvY2FsT3B0aW9ucz17dXNlcm5hbWVGaWVsZDpcImVtYWlsXCJ9LGxvY2FsTG9naW49bmV3IExvY2FsU3RyYXRlZ3kobG9jYWxPcHRpb25zLGZ1bmN0aW9uKHIsZSx0KXtVc2VyLmZpbmRPbmUoe2VtYWlsOnJ9LGZ1bmN0aW9uKHIsbyl7cmV0dXJuIHI/dChyKTpvP3ZvaWQgby5jb21wYXJlUGFzc3dvcmQoZSxmdW5jdGlvbihyLGUpe3JldHVybiByP3Qocik6ZT90KG51bGwsbyk6dChudWxsLCExLHtlcnJvcjpcIllvdXIgbG9naW4gZGV0YWlscyBjb3VsZCBub3QgYmUgdmVyaWZpZWQuIFBsZWFzZSB0cnkgYWdhaW4uXCJ9KX0pOnQobnVsbCwhMSx7ZXJyb3I6XCJZb3VyIGxvZ2luIGRldGFpbHMgY291bGQgbm90IGJlIHZlcmlmaWVkLiBQbGVhc2UgdHJ5IGFnYWluLlwifSl9KX0pLGp3dE9wdGlvbnM9e2p3dEZyb21SZXF1ZXN0OkV4dHJhY3RKd3QuZnJvbUF1dGhIZWFkZXIoKSxzZWNyZXRPcktleTpDT05GSUcuU0VDUkVUfSxqd3RMb2dpbj1uZXcgSnd0U3RyYXRlZ3koand0T3B0aW9ucyxmdW5jdGlvbihyLGUpe1VzZXIuZmluZEJ5SWQoci5faWQsZnVuY3Rpb24ocix0KXtpZihyKXJldHVybiBlKHIsITEpO2UobnVsbCx0fHwhMSl9KX0pO3Bhc3Nwb3J0LnVzZShsb2NhbExvZ2luKSxwYXNzcG9ydC51c2Uoand0TG9naW4pOyIsIlwidXNlIHN0cmljdFwiO3ZhciBST0xFUz17Q0xJRU5UOlwiQ0xJRU5UXCIsQURNSU46XCJBRE1JTlwifSxQRVJNSVNTSU9OUz17UkVBRF9VU0VSUzpcIlJFQURfVVNFUlNcIixXUklURV9VU0VSUzpcIldSSVRFX1VTRVJTXCJ9O21vZHVsZS5leHBvcnRzPXtST0xFUzpST0xFUyxQRVJNSVNTSU9OUzpQRVJNSVNTSU9OU307IiwiXCJ1c2Ugc3RyaWN0XCI7dmFyIF9tb25nb29zZT1yZXF1aXJlKFwibW9uZ29vc2VcIiksX21vbmdvb3NlMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tb25nb29zZSk7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKXtyZXR1cm4gZSYmZS5fX2VzTW9kdWxlP2U6e2RlZmF1bHQ6ZX19dmFyIFNjaGVtYT1fbW9uZ29vc2UyLmRlZmF1bHQuU2NoZW1hLFBlcm1pc3Npb25TY2hlbWE9bmV3IFNjaGVtYSh7bGFiZWw6e3R5cGU6U3RyaW5nLHJlcXVpcmVkOiEwfX0pO21vZHVsZS5leHBvcnRzPV9tb25nb29zZTIuZGVmYXVsdC5tb2RlbChcIlBlcm1pc3Npb25cIixQZXJtaXNzaW9uU2NoZW1hKTsiLCJcInVzZSBzdHJpY3RcIjt2YXIgX21vbmdvb3NlPXJlcXVpcmUoXCJtb25nb29zZVwiKSxfbW9uZ29vc2UyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21vbmdvb3NlKSxfY29uc3RhbnRzPXJlcXVpcmUoXCIuLi9jb25zdGFudHNcIik7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKXtyZXR1cm4gZSYmZS5fX2VzTW9kdWxlP2U6e2RlZmF1bHQ6ZX19dmFyIFNjaGVtYT1fbW9uZ29vc2UyLmRlZmF1bHQuU2NoZW1hLFJvbGVTY2hlbWE9bmV3IFNjaGVtYSh7bGFiZWw6e3R5cGU6U3RyaW5nLGVudW06W19jb25zdGFudHMuUk9MRVMuQURNSU4sX2NvbnN0YW50cy5ST0xFUy5DTElFTlRdLHJlcXVpcmVkOiEwfSxwZXJtaXNzaW9uczpbe3R5cGU6U2NoZW1hLlR5cGVzLk9iamVjdElkLHJlZjpcIlBlcm1pc3Npb25cIn1dfSk7bW9kdWxlLmV4cG9ydHM9X21vbmdvb3NlMi5kZWZhdWx0Lm1vZGVsKFwiUm9sZVwiLFJvbGVTY2hlbWEpOyIsIlwidXNlIHN0cmljdFwiO3ZhciBfYmNyeXB0Tm9kZWpzPXJlcXVpcmUoXCJiY3J5cHQtbm9kZWpzXCIpLF9iY3J5cHROb2RlanMyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2JjcnlwdE5vZGVqcyksX21vbmdvb3NlPXJlcXVpcmUoXCJtb25nb29zZVwiKSxfbW9uZ29vc2UyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX21vbmdvb3NlKTtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KGUpe3JldHVybiBlJiZlLl9fZXNNb2R1bGU/ZTp7ZGVmYXVsdDplfX12YXIgU2NoZW1hPV9tb25nb29zZTIuZGVmYXVsdC5TY2hlbWEsVXNlclNjaGVtYT1uZXcgU2NoZW1hKHtlbWFpbDp7dHlwZTpTdHJpbmcsbG93ZXJjYXNlOiEwLHVuaXF1ZTohMCxyZXF1aXJlZDohMH0scGFzc3dvcmQ6e3R5cGU6U3RyaW5nLHJlcXVpcmVkOiEwfSxmaXJzdE5hbWU6e3R5cGU6U3RyaW5nfSxsYXN0TmFtZTp7dHlwZTpTdHJpbmd9LHJvbGU6e3R5cGU6U2NoZW1hLlR5cGVzLk9iamVjdElkLHJlZjpcIlJvbGVcIn0scmVzZXRQYXNzd29yZFRva2VuOnt0eXBlOlN0cmluZ30scmVzZXRQYXNzd29yZEV4cGlyZXM6e3R5cGU6RGF0ZX19LHt0aW1lc3RhbXBzOiEwfSk7VXNlclNjaGVtYS5wcmUoXCJzYXZlXCIsZnVuY3Rpb24oZSl7dmFyIHI9dGhpcztpZighci5pc01vZGlmaWVkKFwicGFzc3dvcmRcIikpcmV0dXJuIGUoKTtfYmNyeXB0Tm9kZWpzMi5kZWZhdWx0LmdlblNhbHQoNSxmdW5jdGlvbih0LG8pe2lmKHQpcmV0dXJuIGUodCk7X2JjcnlwdE5vZGVqczIuZGVmYXVsdC5oYXNoKHIucGFzc3dvcmQsbyxudWxsLGZ1bmN0aW9uKHQsbyl7aWYodClyZXR1cm4gZSh0KTtyLnBhc3N3b3JkPW8sZSgpfSl9KX0pLFVzZXJTY2hlbWEubWV0aG9kcy5jb21wYXJlUGFzc3dvcmQ9ZnVuY3Rpb24oZSxyKXtfYmNyeXB0Tm9kZWpzMi5kZWZhdWx0LmNvbXBhcmUoZSx0aGlzLnBhc3N3b3JkLGZ1bmN0aW9uKGUsdCl7aWYoZSlyZXR1cm4gcihlKTtyKG51bGwsdCl9KX0sbW9kdWxlLmV4cG9ydHM9X21vbmdvb3NlMi5kZWZhdWx0Lm1vZGVsKFwiVXNlclwiLFVzZXJTY2hlbWEpOyIsIlwidXNlIHN0cmljdFwiO3ZhciBzZXRVc2VySW5mbz1mdW5jdGlvbihlKXtyZXR1cm57X2lkOmUuX2lkLHVwZGF0ZWRBdDplLnVwZGF0ZWRBdCxjcmVhdGVkQXQ6ZS5jcmVhdGVkQXQsZmlyc3ROYW1lOmUuZmlyc3ROYW1lLGxhc3ROYW1lOmUubGFzdE5hbWUsZW1haWw6ZS5lbWFpbCxyb2xlOmUucm9sZX19O21vZHVsZS5leHBvcnRzPXtzZXRVc2VySW5mbzpzZXRVc2VySW5mb307IiwiXCJ1c2Ugc3RyaWN0XCI7dmFyIF9qc29ud2VidG9rZW49cmVxdWlyZShcImpzb253ZWJ0b2tlblwiKSxfanNvbndlYnRva2VuMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9qc29ud2VidG9rZW4pLF91c2VyPXJlcXVpcmUoXCIuLi9tb2RlbHMvdXNlclwiKSxfdXNlcjI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlciksX21haW49cmVxdWlyZShcIi4uL2NvbmZpZy9tYWluXCIpLF9tYWluMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9tYWluKSxfdXRpbD1yZXF1aXJlKFwiLi4vc2VydmljZXMvdXRpbC5zZXJ2aWNlXCIpLF9sb2Rhc2g9cmVxdWlyZShcImxvZGFzaFwiKTtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KGUpe3JldHVybiBlJiZlLl9fZXNNb2R1bGU/ZTp7ZGVmYXVsdDplfX1mdW5jdGlvbiBnZW5lcmF0ZVRva2VuKGUpe3JldHVybiBfanNvbndlYnRva2VuMi5kZWZhdWx0LnNpZ24oZSxfbWFpbjIuZGVmYXVsdC5TRUNSRVQse2V4cGlyZXNJbjozNjAwfSl9cmVxdWlyZShcImNyeXB0b1wiKTt2YXIgcG9wdWxhdGVSb2xlQW5kUGVybWlzc2lvbnM9e3BhdGg6XCJyb2xlXCIscG9wdWxhdGU6e3BhdGg6XCJwZXJtaXNzaW9uc1wifX0sYXV0aENvbnRyb2xsZXI9ZnVuY3Rpb24oKXtyZXR1cm57bG9naW46ZnVuY3Rpb24oZSxyLHQpe2UudXNlci5wb3B1bGF0ZSh7cGF0aDpcInJvbGVcIixwb3B1bGF0ZTp7cGF0aDpcInBlcm1pc3Npb25zXCJ9fSxmdW5jdGlvbihuKXtpZihuKXJldHVybiB0KG4pO3ZhciBvPSgwLF91dGlsLnNldFVzZXJJbmZvKShlLnVzZXIpO3Iuc3RhdHVzKDIwMCkuanNvbih7dG9rZW46XCJKV1QgIFwiK2dlbmVyYXRlVG9rZW4obyksdXNlcjpvfSksdCgpfSl9LGhhc0F1dGhvcml6YXRpb246ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06W10scj1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06W107cmV0dXJuIGU9W10uY29uY2F0KFtdLGUpLHI9W10uY29uY2F0KFtdLHIpLGZ1bmN0aW9uKHQsbixvKXt2YXIgcz10LnVzZXI7X3VzZXIyLmRlZmF1bHQuZmluZEJ5SWQocy5faWQpLnBvcHVsYXRlKFwicm9sZVwiKS5leGVjKGZ1bmN0aW9uKHQscyl7aWYodClyZXR1cm4gbi5zdGF0dXMoNDIyKS5qc29uKHtlcnJvcjpcIk5vIHVzZXIgZm91bmQuXCJ9KSxvKHQpO3ZhciB1PXMucm9sZS5wZXJtaXNzaW9ucy5tYXAoZnVuY3Rpb24oZSl7cmV0dXJuIGUubGFiZWx9KTtyZXR1cm4gZS5pbmRleE9mKHMucm9sZS5sYWJlbCk+LTF8fCgwLF9sb2Rhc2guaW50ZXJzZWN0aW9uKShyLHUpLmxlbmd0aD4wP28oKToobi5zdGF0dXMoNDAxKS5qc29uKHtlcnJvcjpcIllvdSBhcmUgbm90IGF1dGhvcml6ZWQgdG8gdmlldyB0aGlzIGNvbnRlbnRcIn0pLG8oXCJVbmF1dGhvcml6ZWRcIikpfSl9fSxyZWdpc3RlcjpmdW5jdGlvbihlLHIsdCl7dmFyIG49ZS5ib2R5LmVtYWlsLG89ZS5ib2R5LmZpcnN0TmFtZSxzPWUuYm9keS5sYXN0TmFtZSx1PWUuYm9keS5wYXNzd29yZCxhPWUuYm9keS5yb2xlO3JldHVybiBuP28mJnM/dT92b2lkIF91c2VyMi5kZWZhdWx0LmZpbmRPbmUoe2VtYWlsOm59LGZ1bmN0aW9uKGUsaSl7cmV0dXJuIGU/dChlKTppP3Iuc3RhdHVzKDQyMikuc2VuZCh7ZXJyb3I6XCJUaGF0IGVtYWlsIGFkZHJlc3MgaXMgYWxyZWFkeSBpbiB1c2UuXCJ9KTp2b2lkIG5ldyBfdXNlcjIuZGVmYXVsdCh7ZW1haWw6bixwYXNzd29yZDp1LGZpcnN0TmFtZTpvLGxhc3ROYW1lOnMscm9sZTphfSkuc2F2ZShmdW5jdGlvbihlLG4pe2lmKGUpcmV0dXJuIHQoZSk7bi5wb3B1bGF0ZShwb3B1bGF0ZVJvbGVBbmRQZXJtaXNzaW9ucyxmdW5jdGlvbihlKXtpZihlKXJldHVybiB0KGUpO3ZhciBvPSgwLF91dGlsLnNldFVzZXJJbmZvKShuKTtyLnN0YXR1cygyMDEpLmpzb24oe3Rva2VuOlwiSldUICBcIitnZW5lcmF0ZVRva2VuKG8pLHVzZXI6b30pfSl9KX0pOnIuc3RhdHVzKDQyMikuc2VuZCh7ZXJyb3I6XCJZb3UgbXVzdCBlbnRlciBhIHBhc3N3b3JkLlwifSk6ci5zdGF0dXMoNDIyKS5zZW5kKHtlcnJvcjpcIllvdSBtdXN0IGVudGVyIHlvdXIgZnVsbCBuYW1lLlwifSk6ci5zdGF0dXMoNDIyKS5zZW5kKHtlcnJvcjpcIllvdSBtdXN0IGVudGVyIGFuIGVtYWlsIGFkZHJlc3MuXCJ9KX19fTttb2R1bGUuZXhwb3J0cz1hdXRoQ29udHJvbGxlcjsiLCJcInVzZSBzdHJpY3RcIjt2YXIgX3Blcm1pc3Npb24yPXJlcXVpcmUoXCIuLi9tb2RlbHMvcGVybWlzc2lvblwiKSxfcGVybWlzc2lvbjM9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcGVybWlzc2lvbjIpO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocyl7cmV0dXJuIHMmJnMuX19lc01vZHVsZT9zOntkZWZhdWx0OnN9fXZhciBwZXJtaXNzaW9uQ29udHJvbGxlcj1mdW5jdGlvbigpe3JldHVybnthZGQ6ZnVuY3Rpb24ocyxlLG4pe3ZhciBpPXMuYm9keS5sYWJlbDtpZighaSlyZXR1cm4gZS5zdGF0dXMoNDIyKS5zZW5kKHtlcnJvcjpcIllvdSBtdXN0IGVudGVyIGEgcGVybWlzc2lvbiBsYWJlbC5cIn0pO19wZXJtaXNzaW9uMy5kZWZhdWx0LmZpbmRPbmUoe2xhYmVsOml9LGZ1bmN0aW9uKHMsbyl7cz9lLnN0YXR1cyg1MDApLnNlbmQocyk6bz9lLnN0YXR1cyg0MjIpLmpzb24oe2Vycm9yOlwiVGhpcyBwZXJtaXNzaW9uIGFscmVhZHkgZXhpc3RzLlwifSk6bmV3IF9wZXJtaXNzaW9uMy5kZWZhdWx0KHtsYWJlbDppfSkuc2F2ZShmdW5jdGlvbihzLGkpe2lmKHMpcmV0dXJuIG4ocyk7ZS5zdGF0dXMoMjAxKS5qc29uKGkpfSl9KX0sZWRpdDpmdW5jdGlvbihzLGUpe3MucGVybWlzc2lvbi5sYWJlbD1zLmJvZHkubGFiZWwscy5wZXJtaXNzaW9uLnNhdmUoZnVuY3Rpb24ocyxuKXtzP2Uuc3RhdHVzKDUwMCkuc2VuZChzKTplLmpzb24obil9KX0sZmluZDpmdW5jdGlvbihzLGUpe2UuanNvbihzLnBlcm1pc3Npb24pfSxmaW5kQWxsOmZ1bmN0aW9uKHMsZSl7X3Blcm1pc3Npb24zLmRlZmF1bHQuZmluZCh7fSxmdW5jdGlvbihzLG4pe3M/ZS5zdGF0dXMoNTAwKS5zZW5kKHMpOmUuanNvbihuKX0pfSxtaWRkbGV3YXJlOmZ1bmN0aW9uKHMsZSxuKXtfcGVybWlzc2lvbjMuZGVmYXVsdC5maW5kQnlJZChzLnBhcmFtcy5pZCxmdW5jdGlvbihpLG8pe2k/ZS5zdGF0dXMoNTAwKS5zZW5kKGkpOm8/KHMucGVybWlzc2lvbj1vLG4oKSk6ZS5zdGF0dXMoNDA0KS5zZW5kKFwiTm8gcGVybWlzc2lvbiBmb3VuZFwiKX0pfSxyZW1vdmU6ZnVuY3Rpb24ocyxlKXtzLnBlcm1pc3Npb24ucmVtb3ZlKGZ1bmN0aW9uKHMpe3M/ZS5zdGF0dXMoNTAwKS5zZW5kKHMpOmUuc3RhdHVzKDIwNCkuc2VuZChcIlN1Y2Nlc3NmdWxseSByZW1vdmVkXCIpfSl9fX07bW9kdWxlLmV4cG9ydHM9cGVybWlzc2lvbkNvbnRyb2xsZXI7IiwiXCJ1c2Ugc3RyaWN0XCI7dmFyIF9yb2xlMj1yZXF1aXJlKFwiLi4vbW9kZWxzL3JvbGVcIiksX3JvbGUzPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JvbGUyKTtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KGUpe3JldHVybiBlJiZlLl9fZXNNb2R1bGU/ZTp7ZGVmYXVsdDplfX12YXIgcm9sZUNvbnRyb2xsZXI9ZnVuY3Rpb24oKXtyZXR1cm57YWRkOmZ1bmN0aW9uKGUsbyxzKXt2YXIgbj1lLmJvZHkubGFiZWwscj1lLmJvZHkucGVybWlzc2lvbnM/ZS5ib2R5LnBlcm1pc3Npb25zOltdO2lmKCFuKXJldHVybiBvLnN0YXR1cyg0MjIpLnNlbmQoe2Vycm9yOlwiWW91IG11c3QgZW50ZXIgYSByb2xlIGxhYmVsLlwifSk7X3JvbGUzLmRlZmF1bHQuZmluZE9uZSh7bGFiZWw6bn0sZnVuY3Rpb24oZSx0KXtpZihlKW8uc3RhdHVzKDUwMCkuc2VuZChlKTtlbHNlIGlmKHQpby5zdGF0dXMoNDIyKS5qc29uKHtlcnJvcjpcIlRoaXMgcm9sZSBhbHJlYWR5IGV4aXN0cy5cIn0pO2Vsc2V7dmFyIGw9bmV3IF9yb2xlMy5kZWZhdWx0KHtsYWJlbDpuLHBlcm1pc3Npb25zOnJ9KTtsLnNhdmUoZnVuY3Rpb24oZSl7aWYoZSlyZXR1cm4gcyhlKTtsLnBvcHVsYXRlKFwicGVybWlzc2lvbnNcIixmdW5jdGlvbihlLHMpe28uc3RhdHVzKDIwMSkuanNvbihzKX0pfSl9fSl9LGVkaXQ6ZnVuY3Rpb24oZSxvKXtlLnJvbGUubGFiZWw9ZS5ib2R5LmxhYmVsLGUucm9sZS5wZXJtaXNzaW9ucz1lLmJvZHkucGVybWlzc2lvbnMsZS5yb2xlLnNhdmUoZnVuY3Rpb24oZSxzKXtlP28uc3RhdHVzKDUwMCkuc2VuZChlKTpvLmpzb24ocyl9KX0sZmluZDpmdW5jdGlvbihlLG8pe28uanNvbihlLnJvbGUpfSxmaW5kQWxsOmZ1bmN0aW9uKGUsbyl7X3JvbGUzLmRlZmF1bHQuZmluZCh7fSkucG9wdWxhdGUoXCJwZXJtaXNzaW9uc1wiKS5leGVjKGZ1bmN0aW9uKGUscyl7ZT9vLnN0YXR1cyg1MDApLnNlbmQoZSk6by5qc29uKHMpfSl9LG1pZGRsZXdhcmU6ZnVuY3Rpb24oZSxvLHMpe19yb2xlMy5kZWZhdWx0LmZpbmRCeUlkKGUucGFyYW1zLmlkKS5wb3B1bGF0ZShcInBlcm1pc3Npb25zXCIpLmV4ZWMoZnVuY3Rpb24obixyKXtuP28uc3RhdHVzKDUwMCkuc2VuZChuKTpyPyhlLnJvbGU9cixzKCkpOm8uc3RhdHVzKDQwNCkuc2VuZChcIk5vIHJvbGUgZm91bmRcIil9KX0scmVtb3ZlOmZ1bmN0aW9uKGUsbyl7ZS5yb2xlLnJlbW92ZShmdW5jdGlvbihlKXtlP28uc3RhdHVzKDUwMCkuc2VuZChlKTpvLnN0YXR1cygyMDQpLnNlbmQoXCJTdWNjZXNzZnVsbHkgcmVtb3ZlZFwiKX0pfX19O21vZHVsZS5leHBvcnRzPXJvbGVDb250cm9sbGVyOyIsIlwidXNlIHN0cmljdFwiO3ZhciBfdXNlcj1yZXF1aXJlKFwiLi4vbW9kZWxzL3VzZXJcIiksX3VzZXIyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZXIpLF91dGlsPXJlcXVpcmUoXCIuLi9zZXJ2aWNlcy91dGlsLnNlcnZpY2VcIiksX25pZ2h0bWFyZT1yZXF1aXJlKFwibmlnaHRtYXJlXCIpLF9uaWdodG1hcmUyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX25pZ2h0bWFyZSksX2pxdWVyeT1yZXF1aXJlKFwianF1ZXJ5XCIpLF9qcXVlcnkyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2pxdWVyeSk7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKXtyZXR1cm4gZSYmZS5fX2VzTW9kdWxlP2U6e2RlZmF1bHQ6ZX19dmFyIG5pZ2h0bWFyZT1uZXcgX25pZ2h0bWFyZTIuZGVmYXVsdCh7c2hvdzohMH0pLHBvcHVsYXRlUm9sZUFuZFBlcm1pc3Npb25zPXtwYXRoOlwicm9sZVwiLHBvcHVsYXRlOntwYXRoOlwicGVybWlzc2lvbnNcIn19LHVzZXJDb250cm9sbGVyPWZ1bmN0aW9uKCl7cmV0dXJue2FkZDpmdW5jdGlvbihlLHQsbil7fSxlZGl0OmZ1bmN0aW9uKGUsdCl7ZS51c2VyLnNldChlLmJvZHkpLGUudXNlci5zYXZlKGZ1bmN0aW9uKGUsbil7ZT90LnN0YXR1cyg1MDApLnNlbmQoZSk6bi5wb3B1bGF0ZShwb3B1bGF0ZVJvbGVBbmRQZXJtaXNzaW9ucyxmdW5jdGlvbihlKXtlP3Quc3RhdHVzKDUwMCkuc2VuZChlKTp0Lmpzb24oKDAsX3V0aWwuc2V0VXNlckluZm8pKG4pKX0pfSl9LGZpbmQ6ZnVuY3Rpb24oZSx0KXt0Lmpzb24oKDAsX3V0aWwuc2V0VXNlckluZm8pKGUudXNlcikpfSxmaW5kQWxsOmZ1bmN0aW9uKGUsdCl7X3VzZXIyLmRlZmF1bHQuZmluZCh7fSkucG9wdWxhdGUocG9wdWxhdGVSb2xlQW5kUGVybWlzc2lvbnMpLmV4ZWMoZnVuY3Rpb24oZSxuKXtpZihlKXQuc3RhdHVzKDUwMCkuc2VuZChlKTtlbHNle3ZhciB1PW4ubWFwKGZ1bmN0aW9uKGUpe3JldHVybigwLF91dGlsLnNldFVzZXJJbmZvKShlKX0pO3QuanNvbih1KX19KX0sbWlkZGxld2FyZTpmdW5jdGlvbihlLHQsbil7X3VzZXIyLmRlZmF1bHQuZmluZEJ5SWQoZS5wYXJhbXMuaWQpLnBvcHVsYXRlKHBvcHVsYXRlUm9sZUFuZFBlcm1pc3Npb25zKS5leGVjKGZ1bmN0aW9uKHUscil7dT90LnN0YXR1cyg1MDApLnNlbmQodSk6cj8oZS51c2VyPXIsbigpKTp0LnN0YXR1cyg0MDQpLnNlbmQoXCJObyByb2xlIGZvdW5kXCIpfSl9LHJlbW92ZTpmdW5jdGlvbihlLHQpe2UudXNlci5yZW1vdmUoZnVuY3Rpb24oZSl7ZT90LnN0YXR1cyg1MDApLnNlbmQoZSk6dC5zdGF0dXMoMjA0KS5zZW5kKFwiU3VjY2Vzc2Z1bGx5IHJlbW92ZWRcIil9KX0sc2NhbjpmdW5jdGlvbigpe25pZ2h0bWFyZS5nb3RvKFwiaHR0cDovL3d3dy5zZWxvZ2VyLmNvbS9cIikud2FpdCgyZTMpLnR5cGUoJy5qc0lubGluZUNvbnRhaW5lciBpbnB1dFt0eXBlPVwidGV4dFwiXScsXCJwYXJpc1wiKS53YWl0KDFlMykuZXZhbHVhdGUoZnVuY3Rpb24oKXsoMCxfanF1ZXJ5Mi5kZWZhdWx0KSgnLmpzSW5saW5lQ29udGFpbmVyIGlucHV0W3R5cGU9XCJ0ZXh0XCJdJykuZm9jdXMoKSwoMCxfanF1ZXJ5Mi5kZWZhdWx0KShcIi5zZWxlY3RpemUtZHJvcGRvd25cIilbMF0uc3R5bGUuZGlzcGxheT1cImJsb2NrXCJ9KS53YWl0KDNlMykuZXZhbHVhdGUoZnVuY3Rpb24oKXsoMCxfanF1ZXJ5Mi5kZWZhdWx0KShcIi5vcHRpb25Db250YWluZXJcIikuZ2V0KDApLmNsaWNrKCl9KS53YWl0KDFlMykuY2xpY2soXCIuYi1idG4uYi13YXJuXCIpLndhaXQoM2UzKS5ldmFsdWF0ZShmdW5jdGlvbigpe3JldHVybiBBcnJheS5mcm9tKCgwLF9qcXVlcnkyLmRlZmF1bHQpKFwiLmMtcGEtbGlzdFwiKSkubWFwKGZ1bmN0aW9uKGUpe3ZhciB0PXt9O3JldHVybiB0LnByaWNlPSgwLF9qcXVlcnkyLmRlZmF1bHQpKGUpLmZpbmQoXCIuYy1wYS1wcmljZVwiKS50ZXh0KCksdH0pfSkuZW5kKCkudGhlbihmdW5jdGlvbihlKXtlLmZvckVhY2goZnVuY3Rpb24oZSl7fSl9KS5jYXRjaChmdW5jdGlvbihlKXt9KX19fTttb2R1bGUuZXhwb3J0cz11c2VyQ29udHJvbGxlcjsiLCJcInVzZSBzdHJpY3RcIjt2YXIgc2lub249cmVxdWlyZShcInNpbm9uXCIpO2Rlc2NyaWJlKFwiQm9vayBDb250cm9sbGVyIFRlc3RzXCIsZnVuY3Rpb24oKXtkZXNjcmliZShcIlBvc3RcIixmdW5jdGlvbigpe2l0KFwic2hvdWxkIG5vdCBhbGxvdyBhbiBlbXB0eSB0aXRsZSBvbiBwb3N0XCIsZnVuY3Rpb24oKXt2YXIgcz17c3RhdHVzOnNpbm9uLnNweSgpLHNlbmQ6c2lub24uc3B5KCl9O3JlcXVpcmUoXCIuL2Jvb2tDb250cm9sbGVyXCIpKGZ1bmN0aW9uKCl7KHZvaWQgMCkuc2F2ZT1mdW5jdGlvbigpe319KS5wb3N0KHtib2R5OnthdXRob3I6XCJZb3VuZXNzXCJ9fSxzKSxzLnN0YXR1cy5jYWxsZWRXaXRoKDQwMCkuc2hvdWxkLmVxdWFsKCEwLFwiQmFkIFN0YXR1cyBcIitzLnN0YXR1cy5hcmdzWzBdWzBdKSxzLnNlbmQuY2FsbGVkV2l0aChcIlRpdGxlIGlzIHJlcXVpcmVkXCIpLnNob3VsZC5lcXVhbCghMCl9KX0pfSk7IiwiXCJ1c2Ugc3RyaWN0XCI7dmFyIF9leHByZXNzPXJlcXVpcmUoXCJleHByZXNzXCIpLF9leHByZXNzMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9leHByZXNzKSxfcGFzc3BvcnQ9cmVxdWlyZShcInBhc3Nwb3J0XCIpLF9wYXNzcG9ydDI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcGFzc3BvcnQpO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoZSl7cmV0dXJuIGUmJmUuX19lc01vZHVsZT9lOntkZWZhdWx0OmV9fXJlcXVpcmUoXCIuLi9jb25maWcvcGFzc3BvcnRcIik7dmFyIGF1dGhDb250cm9sbGVyPXJlcXVpcmUoXCIuLi9jb250cm9sbGVycy9hdXRoLmNvbnRyb2xsZXJcIikoKSxyZXF1aXJlTG9naW49X3Bhc3Nwb3J0Mi5kZWZhdWx0LmF1dGhlbnRpY2F0ZShcImxvY2FsXCIse3Nlc3Npb246ITF9KTttb2R1bGUuZXhwb3J0cz1mdW5jdGlvbigpe3ZhciBlPW5ldyBfZXhwcmVzczIuZGVmYXVsdC5Sb3V0ZXI7cmV0dXJuIGUucG9zdChcIi9yZWdpc3RlclwiLGF1dGhDb250cm9sbGVyLnJlZ2lzdGVyKSxlLnBvc3QoXCIvbG9naW5cIixyZXF1aXJlTG9naW4sYXV0aENvbnRyb2xsZXIubG9naW4pLGV9OyIsIlwidXNlIHN0cmljdFwiO3ZhciBfY29uc3RhbnRzPXJlcXVpcmUoXCIuLi9jb25zdGFudHNcIiksX2V4cHJlc3M9cmVxdWlyZShcImV4cHJlc3NcIiksX2V4cHJlc3MyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V4cHJlc3MpLF9wYXNzcG9ydD1yZXF1aXJlKFwicGFzc3BvcnRcIiksX3Bhc3Nwb3J0Mj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9wYXNzcG9ydCk7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChlKXtyZXR1cm4gZSYmZS5fX2VzTW9kdWxlP2U6e2RlZmF1bHQ6ZX19cmVxdWlyZShcIi4uL2NvbmZpZy9wYXNzcG9ydFwiKTt2YXIgcGVybWlzc2lvbkNvbnRyb2xsZXI9cmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL3Blcm1pc3Npb24uY29udHJvbGxlclwiKSgpLGF1dGhDb250cm9sbGVyPXJlcXVpcmUoXCIuLi9jb250cm9sbGVycy9hdXRoLmNvbnRyb2xsZXJcIikoKSxyZXF1aXJlQXV0aD1fcGFzc3BvcnQyLmRlZmF1bHQuYXV0aGVudGljYXRlKFwiand0XCIse3Nlc3Npb246ITF9KTttb2R1bGUuZXhwb3J0cz1mdW5jdGlvbigpe3ZhciBlPW5ldyBfZXhwcmVzczIuZGVmYXVsdC5Sb3V0ZXI7cmV0dXJuIGUudXNlKHJlcXVpcmVBdXRoLGF1dGhDb250cm9sbGVyLmhhc0F1dGhvcml6YXRpb24oX2NvbnN0YW50cy5ST0xFUy5BRE1JTikpLGUucG9zdChcIi9cIixwZXJtaXNzaW9uQ29udHJvbGxlci5hZGQpLGUuZ2V0KFwiL1wiLHBlcm1pc3Npb25Db250cm9sbGVyLmZpbmRBbGwpLGUudXNlKFwiLzppZFwiLHBlcm1pc3Npb25Db250cm9sbGVyLm1pZGRsZXdhcmUpLGUuZ2V0KFwiLzppZFwiLHBlcm1pc3Npb25Db250cm9sbGVyLmZpbmQpLGUucHV0KFwiLzppZFwiLHBlcm1pc3Npb25Db250cm9sbGVyLmVkaXQpLGUuZGVsZXRlKFwiLzppZFwiLHBlcm1pc3Npb25Db250cm9sbGVyLnJlbW92ZSksZX07IiwiXCJ1c2Ugc3RyaWN0XCI7dmFyIF9jb25zdGFudHM9cmVxdWlyZShcIi4uL2NvbnN0YW50c1wiKSxfZXhwcmVzcz1yZXF1aXJlKFwiZXhwcmVzc1wiKSxfZXhwcmVzczI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZXhwcmVzcyksX3Bhc3Nwb3J0PXJlcXVpcmUoXCJwYXNzcG9ydFwiKSxfcGFzc3BvcnQyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Bhc3Nwb3J0KTtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KGUpe3JldHVybiBlJiZlLl9fZXNNb2R1bGU/ZTp7ZGVmYXVsdDplfX1yZXF1aXJlKFwiLi4vY29uZmlnL3Bhc3Nwb3J0XCIpO3ZhciByb2xlQ29udHJvbGxlcj1yZXF1aXJlKFwiLi4vY29udHJvbGxlcnMvcm9sZS5jb250cm9sbGVyXCIpKCksYXV0aENvbnRyb2xsZXI9cmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL2F1dGguY29udHJvbGxlclwiKSgpLHJlcXVpcmVBdXRoPV9wYXNzcG9ydDIuZGVmYXVsdC5hdXRoZW50aWNhdGUoXCJqd3RcIix7c2Vzc2lvbjohMX0pO21vZHVsZS5leHBvcnRzPWZ1bmN0aW9uKCl7dmFyIGU9bmV3IF9leHByZXNzMi5kZWZhdWx0LlJvdXRlcjtyZXR1cm4gZS51c2UocmVxdWlyZUF1dGgsYXV0aENvbnRyb2xsZXIuaGFzQXV0aG9yaXphdGlvbihfY29uc3RhbnRzLlJPTEVTLkFETUlOLF9jb25zdGFudHMuUEVSTUlTU0lPTlMuUkVBRF9VU0VSUykpLGUucG9zdChcIi9cIixyb2xlQ29udHJvbGxlci5hZGQpLGUuZ2V0KFwiL1wiLHJvbGVDb250cm9sbGVyLmZpbmRBbGwpLGUudXNlKFwiLzppZFwiLHJvbGVDb250cm9sbGVyLm1pZGRsZXdhcmUpLGUuZ2V0KFwiLzppZFwiLHJvbGVDb250cm9sbGVyLmZpbmQpLGUucHV0KFwiLzppZFwiLHJvbGVDb250cm9sbGVyLmVkaXQpLGUuZGVsZXRlKFwiLzppZFwiLHJvbGVDb250cm9sbGVyLnJlbW92ZSksZX07IiwiXCJ1c2Ugc3RyaWN0XCI7dmFyIF9leHByZXNzPXJlcXVpcmUoXCJleHByZXNzXCIpLF9leHByZXNzMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9leHByZXNzKSxfcGFzc3BvcnQ9cmVxdWlyZShcInBhc3Nwb3J0XCIpLF9wYXNzcG9ydDI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcGFzc3BvcnQpLF9jb25zdGFudHM9cmVxdWlyZShcIi4uL2NvbnN0YW50c1wiKTtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KGUpe3JldHVybiBlJiZlLl9fZXNNb2R1bGU/ZTp7ZGVmYXVsdDplfX1yZXF1aXJlKFwiLi4vY29uZmlnL3Bhc3Nwb3J0XCIpO3ZhciB1c2VyQ29udHJvbGxlcj1yZXF1aXJlKFwiLi4vY29udHJvbGxlcnMvdXNlci5jb250cm9sbGVyXCIpKCksYXV0aENvbnRyb2xsZXI9cmVxdWlyZShcIi4uL2NvbnRyb2xsZXJzL2F1dGguY29udHJvbGxlclwiKSgpLHJlcXVpcmVBdXRoPV9wYXNzcG9ydDIuZGVmYXVsdC5hdXRoZW50aWNhdGUoXCJqd3RcIix7c2Vzc2lvbjohMX0pO21vZHVsZS5leHBvcnRzPWZ1bmN0aW9uKCl7dmFyIGU9bmV3IF9leHByZXNzMi5kZWZhdWx0LlJvdXRlcjtyZXR1cm4gZS51c2UocmVxdWlyZUF1dGgsYXV0aENvbnRyb2xsZXIuaGFzQXV0aG9yaXphdGlvbihfY29uc3RhbnRzLlJPTEVTLkFETUlOKSksZS5nZXQoXCIvXCIsdXNlckNvbnRyb2xsZXIuZmluZEFsbCksZS5nZXQoXCIvXCIsdXNlckNvbnRyb2xsZXIuc2NhbiksZS51c2UoXCIvOmlkXCIsdXNlckNvbnRyb2xsZXIubWlkZGxld2FyZSksZS5nZXQoXCIvOmlkXCIsdXNlckNvbnRyb2xsZXIuZmluZCksZS5wdXQoXCIvOmlkXCIsdXNlckNvbnRyb2xsZXIuZWRpdCksZS5kZWxldGUoXCIvOmlkXCIsdXNlckNvbnRyb2xsZXIucmVtb3ZlKSxlfTsiLCJcInVzZSBzdHJpY3RcIjt2YXIgX2V4cHJlc3M9cmVxdWlyZShcImV4cHJlc3NcIiksX2V4cHJlc3MyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V4cHJlc3MpO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoZSl7cmV0dXJuIGUmJmUuX19lc01vZHVsZT9lOntkZWZhdWx0OmV9fXZhciBjb21wcmVzc2lvbj1yZXF1aXJlKFwiY29tcHJlc3Npb25cIiksYXBwPSgwLF9leHByZXNzMi5kZWZhdWx0KSgpLGJvZHlQYXJzZXI9cmVxdWlyZShcImJvZHktcGFyc2VyXCIpLGxvZ2dlcj1yZXF1aXJlKFwibW9yZ2FuXCIpLG1vbmdvb3NlPXJlcXVpcmUoXCJtb25nb29zZVwiKSxDT05GSUc9cmVxdWlyZShcIi4vY29uZmlnL21haW5cIiksYXV0aFJvdXRlcj1yZXF1aXJlKFwiLi9yb3V0ZXJzL2F1dGgucm91dGVyXCIpKCksdXNlclJvdXRlcj1yZXF1aXJlKFwiLi9yb3V0ZXJzL3VzZXIucm91dGVyXCIpKCkscm9sZVJvdXRlcj1yZXF1aXJlKFwiLi9yb3V0ZXJzL3JvbGUucm91dGVyXCIpKCkscGVybWlzc2lvblJvdXRlcj1yZXF1aXJlKFwiLi9yb3V0ZXJzL3Blcm1pc3Npb24ucm91dGVyXCIpKCk7bW9uZ29vc2UuY29ubmVjdChDT05GSUcuTU9OR09EQl9VUkkpLFwidGVzdFwiPT09cHJvY2Vzcy5lbnYuRU5WfHwobW9uZ29vc2UuY29ubmVjdChwcm9jZXNzLmVudi5NT05HT0RCX1VSSXx8Q09ORklHLk1PTkdPREJfVVJJKSxhcHAubGlzdGVuKHByb2Nlc3MuZW52LlBPUlR8fENPTkZJRy5QT1JUKSksYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoe2V4dGVuZGVkOiExfSkpLGFwcC51c2UoYm9keVBhcnNlci5qc29uKCkpLGFwcC51c2UobG9nZ2VyKFwiZGV2XCIpKSxhcHAudXNlKGNvbXByZXNzaW9uKCkpLGFwcC51c2UoZnVuY3Rpb24oZSxyLHMpe3IuaGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCIsQ09ORklHLkNPUlMub3JpZ2luKSxyLmhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LU1ldGhvZHNcIixDT05GSUcuQ09SUy5tZXRob2RzKSxyLmhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LUhlYWRlcnNcIixDT05GSUcuQ09SUy5oZWFkZXJzKSxyLmhlYWRlcihcIkFjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzXCIsQ09ORklHLkNPUlMuY3JlZGVudGlhbHMpLHMoKX0pO3ZhciBhcGlSb3V0ZXM9bmV3IF9leHByZXNzMi5kZWZhdWx0LlJvdXRlcjthcHAudXNlKFwiL2FwaVwiLGFwaVJvdXRlcyksYXBpUm91dGVzLnVzZShcIi9hdXRoXCIsYXV0aFJvdXRlciksYXBpUm91dGVzLnVzZShcIi91c2VyXCIsdXNlclJvdXRlciksYXBpUm91dGVzLnVzZShcIi9yb2xlXCIscm9sZVJvdXRlciksYXBpUm91dGVzLnVzZShcIi9wZXJtaXNzaW9uXCIscGVybWlzc2lvblJvdXRlciksYXBwLnVzZShfZXhwcmVzczIuZGVmYXVsdC5zdGF0aWMoXCJwdWJsaWNcIikpOyIsbnVsbF19
