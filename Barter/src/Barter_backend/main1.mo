import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Array "mo:base/Array";

actor BarterSystem {
    type UserId = Text;
    type ProductId = Text;
    type TransactionId = Text;
    
    type Product = {
        id: ProductId;
        name: Text;
        owner: UserId;
        value: Nat;
        available: Bool;
        imageUrl: Text;
        description: Text;
        category: Text;
    };

    type User = {
        id: UserId;
        name: Text;
        beeCoins: Nat;
    };

    let users = HashMap.HashMap<UserId, User>(10, Text.equal, Text.hash);
    let products = HashMap.HashMap<ProductId, Product>(10, Text.equal, Text.hash);
    let transactions = HashMap.HashMap<TransactionId, (UserId, ProductId)>(10, Text.equal, Text.hash);

    /// Register a new user
    public func registerUser(id: UserId, name: Text) : async Bool {
        if (users.get(id) != null) {
            return false; // User already exists
        } else {
            users.put(id, { id = id; name = name; beeCoins = 0 });
            return true;
        }
    };

    /// Add a new product
    public func addProduct(
        id: ProductId, 
        name: Text, 
        owner: UserId, 
        value: Nat,
        imageUrl: Text,
        description: Text,
        category: Text
    ) : async Bool {
        if (products.get(id) != null or users.get(owner) == null) {
            return false; // Product already exists or owner not registered
        } else {
            products.put(id, { 
                id = id; 
                name = name; 
                owner = owner; 
                value = value; 
                available = true;
                imageUrl = imageUrl;
                description = description;
                category = category;
            });
            return true;
        }
    };

    /// Fixed-Price Trade (Shopkeeper Issues Transaction ID)
    public func fixedPriceTrade(productId: ProductId, userId: UserId, transactionId: TransactionId) : async Bool {
        switch (products.get(productId)) {
            case (null) { return false };
            case (?product) {
                if (not product.available or product.owner != userId) {
                    return false;
                } else {
                    transactions.put(transactionId, (userId, productId));
                    return true;
                }
            };
        }
    };

    /// Direct Product Exchange
    public func directExchange(productA: ProductId, productB: ProductId) : async Bool {
        let prodA = products.get(productA);
        let prodB = products.get(productB);

        if (prodA == null or prodB == null) {
            return false;
        } else {
            let a = switch (prodA) {
                case (?product) { product };
                case null { return false };
            };
            let b = switch (prodB) {
                case (?product) { product }; 
                case null { return false };
            };

            if (a.value == b.value) {
                products.put(productA, { a with owner = b.owner });
                products.put(productB, { b with owner = a.owner });
                return true;
            } else {
                return false;
            }
        }
    };

    /// Unequal Exchange (Bee Coins Compensation)
    public func unequalExchange(higherValueProduct: ProductId, lowerValueProduct: ProductId) : async Bool {
        let prodHigh = products.get(higherValueProduct);
        let prodLow = products.get(lowerValueProduct);
        
        if (prodHigh == null or prodLow == null) {
            return false;
        } else {
            let high = switch (prodHigh) {
                case (?h) { h };
                case null { return false };
            };
            let low = switch (prodLow) {
                case (?l) { l };
                case null { return false };
            };
            
            if (high.value > low.value) {
                let diff = Nat.sub(high.value, low.value);
                switch (users.get(high.owner)) {
                    case (?ownerHigh) {
                        switch (users.get(low.owner)) {
                            case (?_) {
                                let newBalance = if (ownerHigh.beeCoins + diff > ownerHigh.beeCoins) { 
                                    ownerHigh.beeCoins + diff 
                                } else { 
                                    return false 
                                };
                                users.put(ownerHigh.id, { ownerHigh with beeCoins = newBalance });
                                products.put(higherValueProduct, { high with owner = low.owner });
                            };
                            case null { return false };
                        };
                    };
                    case null { return false };
                };
                products.put(lowerValueProduct, { low with owner = high.owner });
                return true;
            } else {
                return false;
            }
        }
    };

    /// Triangulation Exchange (Multi-User Trade)
    public func triangulationExchange(productsToTrade: [(ProductId, UserId)]) : async Bool {
        for ((productId, newOwner) in productsToTrade.vals()) {
            switch (products.get(productId)) {
                case (null) { return false };
                case (?product) {
                    if (users.get(newOwner) == null) {
                        return false;
                    } else {
                        products.put(productId, { product with owner = newOwner });
                    }
                };
            }
        };
        return false;
    };

    /// Check User Balance
    public query func getUserBalance(userId: UserId) : async ?Nat {
        switch (users.get(userId)) {
            case (null) { return null };
            case (?user) { return ?user.beeCoins };
        }
    };

    /// Get Product Details
    public query func getProduct(productId: ProductId) : async ?Product {
        return products.get(productId);
    };

    /// Get Products by Category
    public query func getProductsByCategory(category: Text) : async [Product] {
        var result : [Product] = [];
        for ((_, product) in products.entries()) {
            if (product.category == category) {
                result := Array.append(result, [product]);
            };
        };
        return result;
    };

    /// Get All Products
    public query func getAllProducts() : async [Product] {
        var result : [Product] = [];
        for ((_, product) in products.entries()) {
            result := Array.append(result, [product]);
        };
        return result;
    };

    /// Get User's Products
    public query func getUserProducts(userId: UserId) : async [Product] {
        var result : [Product] = [];
        for ((_, product) in products.entries()) {
            if (product.owner == userId) {
                result := Array.append(result, [product]);
            };
        };
        return result;
    };
}
