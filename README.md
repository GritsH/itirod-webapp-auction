# Auction
### The main idea of the project (please, bear with me):
1. If you are a simple **_user_**
   - When you wisiting site for the first time, the page which consists of `Log in` and `Sign up` commands appear.
        - If you are new to this app you can `Sign up` and then `Log in`
   - If you logged in, the following page you will see consists of scrolling view, where you can see all available lots in which you can participate, and small user window with user's email and buttons with basic commands. 
   - You can buy all items that are avaliable on this app. If you found something you like, you can participate in the corresponding lot. When the day comes you can bid (raise a starting price). But remember, that the price you offer must be higher then the current price: every lot has its `auction step`. It's an amount of money by which you can raise the price. If the price you offered is higher, you bacome a **lot leader**. If nobody dares to change the current price within some time, item becomes yours. After the lot is closed and you are the winner, the contract between you and item's owner is signed. Congrats!!
   - If you don't have any money you can sell your items. For this, you need to `add item` first. Then create a lot. Remeber, set a reasonable `starting price` and `action step`. Nobody wants to buy junk for big money. And all you have to do is wait. 
2. If you are an **_admin_**
   - You can `get users' information`. 
   - You can also `get information about any specific item`.
   - But you cannot delete any users or items. You are not that powerful.

### [Mock up](https://www.figma.com/file/8MYGvNtDYHoc6KN9ML32m4/Grits-Auction?node-id=4%3A57) of this project (WARNING: im really bad at this)

### Main functions:
In this app you can:
1. `Log in` and `Sign up` (self explanatory)
2. `Add item` 
3. `Delete item`
4. `Create lot` if you have an item you'd like to sell.
5. `Participate` if you have money to buy something.
6. `Leave` if you changed your mind and don't want to participate in the auction of this item anymore.
7. `Watch` if you are the lot owner and want to see how things going while others fighting for your things.

### Data models


![auction (1)](https://user-images.githubusercontent.com/61628266/157428098-b2382498-89a8-41ee-b1fe-bfac3591ed05.jpg)
