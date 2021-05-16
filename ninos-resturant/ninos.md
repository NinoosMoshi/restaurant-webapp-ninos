<h2>AuthenticationManagerBuilder</h2>
is responsible to check (username and password) from login and (username and password) from database.

<h3>setUserDetailsService</h3>
setUserDetailsService has a service that responsible to retrieve data from the database to make a matches

<h3>UserDetailsService</h3>
UserDetailsService interface is used in order to lookup the username, password and GrantedAuthorities for any given user.

This interface provide only one method which implementing class need to implement-

<span style="color:gray;">
 @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return null;
    }
</span>


<h2>GrantedAuthority : </h2>
it's mean what the user or admin can do(permission).
example: let's say **user** can just read, the <span style="color:red;">Read is</span> a <span style="color:red;">GrantedAuthority</span>,
and **admin** can <span style="color:red;">read,write,delete,update</span> these <span style="color:red;">are GrantedAuthority</span>.


<h2>Role :</h2>
example <span style="color:red;">USER_ROLE</span> , <span style="color:red;">ADMIN_ROLE</span> , <span style="color:red;">MANAGER_ROLE</span> , .....


<h2>Claims</h2>
**Located in payload in jwt**, Claims are pieces of information asserted about a subject .
example:
<span style="color:red;">"sub", "name", "admin", iss, exp, .....</span>
<img src="https://cdn.auth0.com/blog/legacy-app-auth/legacy-app-auth-5.png" />




<h2>SimpleGrantedAuthority</h2>
Stores a String representation of an authority granted to the Authentication object

<h2>SecurityContext</h2>
<p>is used to store the details of the currently authenticated user, also known as a principle. So, if you have to get the username or any other user details, you need to get this SecurityContext first

<h3>SecurityContextHolder</h3>
<p>is a helper class, which provides access to the security context

<h3>filterChain</h3>
<p>it allows us to pass a request from one filter to another filter</p>


<h3>ObjectMapper</h3>
<p>reading JSON from external "post.json" file and converting it into Java Object (Post.java)</p>

